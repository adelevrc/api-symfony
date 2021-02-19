<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Repository\AnimalRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AnimalController extends AbstractController
{

    /**
     * @Route("/animal", name="animal_show")
     */
    public function showAllAnimal(AnimalRepository $repo): Response
    {
        $animals = $repo->findAll();
        return $this->render('animal/animals.html.twig', ['animals' => $animals]);
    }

    /** 
     * @Route("/create-animal", name="create_animal")
     */

    public function createAnimal(ValidatorInterface $validator): Response
    {

        $entityManager = $this->getDoctrine()->getManager();
        $animal = new Animal();
        $animal->setName('Pif le Cheval');
        $animal->setDescription('Incroyable');
        $animal->setCare('plein de bisous et de calins et des caresses');
        $animal->setPhoto('https://cdn.pixabay.com/photo/2015/03/26/10/10/turtle-691040_960_720.jpg');
        $animal->setIsDead(false);

        $entityManager->persist($animal);
        $entityManager->flush();


        $errors = $validator->validate($animal);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }
        return new Response('Saved new product with id ' . $animal->getId());
    }

    /**
     * @Route("/animal/{id}", name="one_animal_show")
     */

    public function showOne(int $id): Response
    {
        $animal = $this->getDoctrine()
            ->getRepository(Animal::class)
            ->find($id);

        if (!$animal) {
            throw $this->createNotFoundException(
                'No product found for id ' . $id
            );
        }

        return new Response('Check out this great product: ' . $animal->getName());
    }

    /**
     * @Route("/animal/edit/{id}")
     */
    public function updateAnimal(int $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $animal = $entityManager->getRepository(Animal::class)->find($id);

        if (!$animal) {
            throw $this->createNotFoundException(
                'No product found for id ' . $id
            );
        }

        $animal->setName('Miaou La tortue');
        $entityManager->flush();

        return $this->redirectToRoute('animal_show');
    }

    /**
     * @Route("/animal/delete/{id}")
     */
    public function deleteAnimal(int $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $animal = $entityManager->getRepository(Animal::class)->find($id);

        if (!$animal) {
            throw $this->createNotFoundException(
                'No product found for id ' . $id
            );
        }

        $entityManager->remove($animal);
        $entityManager->flush();

        return $this->redirectToRoute('animal_show');
    }
}
