<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Form\AnimalType;
use App\Repository\AnimalRepository;
use Doctrine\DBAL\Types\BooleanType;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
// use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;


class ApiAnimalController extends AbstractController
{
    /** 
     * @Route("/api/animal", name= "api_animal_get", methods={"GET"})
     */
    public function getAnimals(AnimalRepository $animalRepository): Response
    {
        // au lieu de faire cette ligne du dessus, on le met directement en premier dans le json
        //$animals = $animalRepository->findAll();

        // Ces deux lignes du dessous rassemblées font exactement la même chose que la ligne unique du serializer
        // $animalNormalise = $normalizer->normalize($animals);
        // $json = json_encode($animalNormalise);


        // $response = new Response($json, 200, [
        //     "Content-Type" => "application/json"
        // ]);


        // cette opération en desssous prend 
        // $json = $serializer->serialize($animals, 'json'); et 
        //  $response = new JsonResponse($json, 200, [], true);

        return $this->json($animalRepository->findAll(), 200, []);
    }
    /** 
     * @Route("/api/animal/{id}", name= "api_animal_get_by_id", methods={"GET"})
     */
    public function getOneAnimal(int $id, AnimalRepository $animalRepository): Response
    {
        return $this->json($animalRepository->find($id), 200, []);
    }

    /** 
     * @Route("/api/animal", name= "api_animal_post", methods={"POST"})
     */

    public function postAnimal(Request $request, LoggerInterface $logger, EntityManagerInterface $em)
    {
        $animal = new Animal();
        $form = $this->createForm(AnimalType::class, $animal);

        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        $logger->info('I just got the logger');
        $logger->info(print_r($data));

        if ($form->isSubmitted() && $form->isValid()) {
            $animal = $form->getData();
            $em->persist($animal);
            $em->flush();
        } else {
            $errors = $this->getErrorsFromForm($form);
            $data = [
                'type' => 'validation_error',
                'title' => 'There was a validation error',
                'errors' => $errors
            ];
            return new JsonResponse($data, 400);
        }

        return new Response('Saved new product with id ' . $animal->getId());
    }

    private function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }


    /** 
     * @Route("/api/animal/{id}", name= "api_animal_edit", methods={"PUT"})
     */

    public function editAnimal(int $id, AnimalRepository $animalRepository, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $animal = $animalRepository->find($id);

        if (!$animal) {
            throw $this->createNotFoundException(
                'No product found for id ' . $id
            );
        }

        $animal->setName('Pif le Cheval');
        // $animal->setDateofBirth('');
        $animal->setDescription('Parfait pour envahir Troie');
        $animal->setCare('Ne surtout pas lui parler d\'Helene');
        $animal->setPhoto('https://cdn.pixabay.com/photo/2013/07/13/14/00/rocker-161936_1280.png');
        $animal->setisDead('false');

        $em->persist($animal);
        $em->flush();

        return $this->json([
            'name' => $animal->getName(),
            'dateOfBirth' => $animal->getDateOfBirth(),
            'description' => $animal->getDescription(),
            'care' => $animal->getCare(),
            'photo' => $animal->getPhoto(),
            'isDead' => $animal->getIsDead()

        ]);
    }


    /** 
     * @Route("/api/animal/{id}", name= "api_animal_delete", methods={"DELETE"})
     */
    public function deleteAnimal(int $id, EntityManagerInterface $em)
    {
        $animal = $em->getRepository(Animal::class)->find($id);

        if (!$animal) {
            throw $this->createNotFoundException(
                'Pas d\'animal connu avec l\'id ' . $id
            );
        }

        $em->remove($animal);
        $em->flush();

        // return $this->json($animal, 204, []);

        return new Response(null, 204);
    }
}
