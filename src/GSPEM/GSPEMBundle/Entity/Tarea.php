<?php

namespace GSPEM\GSPEMBundle\Entity;

/**
 * Tarea
 */
class Tarea
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $descript;

    /**
     * @var integer
     */
    private $tecnico;

    /**
     * @var integer
     */
    private $creador;

    /**
     * @var \DateTime
     */
    private $inicio;

    /**
     * @var \DateTime
     */
    private $fin;

    /**
     * @var string
     */
    private $nota;

    /**
     * @var integer
     */
    private $state;


    /**
     * Set name
     *
     * @param string $name
     *
     * @return Tarea
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set descript
     *
     * @param string $descript
     *
     * @return Tarea
     */
    public function setDescript($descript)
    {
        $this->descript = $descript;

        return $this;
    }

    /**
     * Get descript
     *
     * @return string
     */
    public function getDescript()
    {
        return $this->descript;
    }

    /**
     * Set tecnico
     *
     * @param integer $tecnico
     *
     * @return Tarea
     */
    public function setTecnico($tecnico)
    {
        $this->tecnico = $tecnico;

        return $this;
    }

    /**
     * Get tecnico
     *
     * @return integer
     */
    public function getTecnico()
    {
        return $this->tecnico;
    }

    /**
     * Set creador
     *
     * @param integer $creador
     *
     * @return Tarea
     */
    public function setCreador($creador)
    {
        $this->creador = $creador;

        return $this;
    }

    /**
     * Get creador
     *
     * @return integer
     */
    public function getCreador()
    {
        return $this->creador;
    }

    /**
     * Set inicio
     *
     * @param \DateTime $inicio
     *
     * @return Tarea
     */
    public function setInicio($inicio)
    {
        $this->inicio = $inicio;

        return $this;
    }

    /**
     * Get inicio
     *
     * @return \DateTime
     */
    public function getInicio()
    {
        return $this->inicio;
    }

    /**
     * Set fin
     *
     * @param \DateTime $fin
     *
     * @return Tarea
     */
    public function setFin($fin)
    {
        $this->fin = $fin;

        return $this;
    }

    /**
     * Get fin
     *
     * @return \DateTime
     */
    public function getFin()
    {
        return $this->fin;
    }

    /**
     * Set nota
     *
     * @param string $nota
     *
     * @return Tarea
     */
    public function setNota($nota)
    {
        $this->nota = $nota;

        return $this;
    }

    /**
     * Get nota
     *
     * @return string
     */
    public function getNota()
    {
        return $this->nota;
    }

    /**
     * Set state
     *
     * @param integer $state
     *
     * @return Tarea
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return integer
     */
    public function getState()
    {
        return $this->state;
    }
    /**
     * @var integer
     */
    private $sitio;


    /**
     * Set sitio
     *
     * @param integer $sitio
     *
     * @return Tarea
     */
    public function setSitio($sitio)
    {
        $this->sitio = $sitio;

        return $this;
    }

    /**
     * Get sitio
     *
     * @return integer
     */
    public function getSitio()
    {
        return $this->sitio;
    }
    /**
     * @var integer
     */
    private $estado;


    /**
     * Set estado
     *
     * @param integer $estado
     *
     * @return Tarea
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get estado
     *
     * @return integer
     */
    public function getEstado()
    {
        return $this->estado;
    }
}
