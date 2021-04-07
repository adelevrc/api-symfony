<?php

namespace App\Controller;

use App\Entity\Article;
use App\Form\ArticleType;
use Psr\Log\LoggerInterface;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiProductController extends AbstractController
{
    /** 
     * @Route("/api/article", name= "api_article_get", methods={"GET"})
     */

    public function getArticle(ArticleRepository $articleRepository): Response
    {
        return $this->json($articleRepository->findAll(), 200, []);
    }

    /** 
     * @Route("/api/article/{id}", name= "api_article_get_by_id", methods={"GET"})
     */

    public function getOneArticle(int $id, ArticleRepository $articleRepository): Response
    {
        return $this->json($articleRepository->find($id), 200, []);
    }

    /** 
     * @Route("/api/article", name= "api_article_post", methods={"POST"})
     */

    public function postAnimal(Request $request, LoggerInterface $logger, EntityManagerInterface $em)
    {
        $animal = new Article();
        $form = $this->createForm(ArticleType::class, $animal);

        //$logger->info($request->getContent());
        $data = json_decode($request->getContent(), true);
        $form->submit($data);


        if ($form->isSubmitted() && $form->isValid()) {
            $logger->info('Validated');
            $animal = $form->getData();
            $em->persist($animal);
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

        return new JsonResponse('Saved new product with id ' . $animal->getId(), 200);
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
     * @Route("/api/article/{id}", name= "api_article_edit", methods={"PUT"})
     */

    public function updateArticle(Article $article, Request $request, EntityManagerInterface $em, LoggerInterface $logger)
    {
        $logger->info('IM HERE');
        $data = json_decode($request->getContent(), true);
        var_dump($data);

        if (!$article) {
            $article = new Article();
        }

        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        $logger->info($request->getContent());
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $logger->info('Validated');
            $animal = $form->getData();
            var_dump($animal);
            $em->persist($animal);
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
     * @Route("/api/product/{id}", name= "api_product_delete", methods={"DELETE"})
     */

    public function deleteArticle(int $id, EntityManagerInterface $em)
    {
        $article = $em->getRepository(Article::class)->find($id);

        if (!$article) {
            throw $this->createNotFoundException(
                'Pas de produit connu avec l\'id ' . $id
            );
        }

        $em->remove($article);
        $em->flush();

        // return $this->json($animal, 204, []);

        return new Response(null, 204);
    }
}
