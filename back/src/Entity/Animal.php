<?php

namespace App\Entity;

use App\Repository\AnimalRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=AnimalRepository::class)
 */
class Animal
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message = "Le nom de l'animal est obligatoire")
     * @Assert\Length(min=3)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $DateOfBirth;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $care;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message = "le lien de la photo est obligatoire")
     * @Assert\Length(min=15)
     */
    private $photo;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isDead;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->DateOfBirth;
    }

    public function setDateOfBirth(?\DateTimeInterface $DateOfBirth): self
    {
        $this->DateOfBirth = $DateOfBirth;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCare(): ?string
    {
        return $this->care;
    }

    public function setCare(?string $care): self
    {
        $this->care = $care;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getIsDead(): ?bool
    {
        return $this->isDead;
    }

    public function setIsDead(bool $isDead): self
    {
        $this->isDead = $isDead;

        return $this;
    }
}
