<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Psr\Log\LoggerInterface;
use App\Repository\UserRepository;
use Symfony\Component\Form\FormInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /** 
     * @Route("/api/user", name= "api_user_get", methods={"GET"})
     */

    public function getUsers(UserRepository $userRepository): Response
    {
        return $this->json($userRepository->findAll(), 200, []);
    }

    /** 
     * @Route("/api/user/{id}", name= "api_user_get_by_id", methods={"GET"})
     */
    public function getOneUser(int $id, UserRepository $userRepository): Response
    {
        return $this->json($userRepository->find($id), 200, []);
    }

    /** 
     * @Route("/api/user", name= "api_user_post", methods={"POST"})
     */

    public function postUser(Request $request, LoggerInterface $logger, EntityManagerInterface $em)
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);


        $data = json_decode($request->getContent(), true);
        $form->submit($data);


        if ($form->isSubmitted() && $form->isValid()) {
            $logger->info('Validated');
            $user = $form->getData();
            $em->persist($user);
            $em->flush();
        } else {
            $logger->info('NOT validated');
            $errors = $this->getErrorsFromForm($form);

            foreach ($errors as $error) {
                $logger->info($error);
            }

            $data = [
                'type' => 'validation_error',
                'title' => 'There was a validation error',
                'errors' => $errors
            ];
            return new JsonResponse($data, 400);
        }

        return new JsonResponse('Saved new user with id ' . $user->getId(), 200);
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
     * @Route("/api/user/{id}", name= "api_user_edit", methods={"PUT"})
     */
    public function updateUser(User $user, Request $request, EntityManagerInterface $em, LoggerInterface $logger)
    {
        $logger->info('IM HERE');
        $data = json_decode($request->getContent(), true);
        var_dump($data);

        if (!$user) {
            $user = new User();
        }

        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        $logger->info($request->getContent());
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $logger->info('Validated');
            $user = $form->getData();
            var_dump($user);
            $em->persist($user);
            $em->flush();
        } else {
            $logger->info('NOT validated');
            $errors = $this->getErrorsFromForm($form);
            foreach ($errors as $error) {
                $logger->info($error);
            }
            $data = [
                'type' => 'validation_error',
                'title' => 'There was a validation error',
                'errors' => $errors
            ];
            return new JsonResponse($data, 400);
        }
        return new JsonResponse('OK', 200);
    }

    /** 
     * @Route("/api/user/{id}", name= "api_user_delete", methods={"DELETE"})
     */

    public function deleteUser(int $id, EntityManagerInterface $em)
    {
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            throw $this->createNotFoundException(
                'Pas d\’utilisateur connu avec l\'id ' . $id
            );
        }

        $em->remove($user);
        $em->flush();

        // return $this->json($animal, 204, []);

        return new Response(null, 204);
    }
}
