<?php

namespace GSPEM\GSPEMBundle\Entity;

/**
 * MovStockTec
 */
class MovStockTec
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
     * @var integer
     */
    private $tecnico;

    /**
     * @var \DateTime
     */
    private $inicio;

    /**
     * @var \DateTime
     */
    private $fin;

    /**
     * @var integer
     */
    private $state;

    /**
     * @var integer
     */
    private $origen;

    /**
     * @var string
     */
    private $nota;

    /**
     * @var integer
     */
    private $type;


    /**
     * Set tecnico
     *
     * @param integer $tecnico
     *
     * @return MovStockTec
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
     * Set inicio
     *
     * @param \DateTime $inicio
     *
     * @return MovStockTec
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
     * @return MovStockTec
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
     * Set state
     *
     * @param integer $state
     *
     * @return MovStockTec
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
     * Set origen
     *
     * @param integer $origen
     *
     * @return MovStockTec
     */
    public function setOrigen($origen)
    {
        $this->origen = $origen;

        return $this;
    }

    /**
     * Get origen
     *
     * @return integer
     */
    public function getOrigen()
    {
        return $this->origen;
    }

    /**
     * Set nota
     *
     * @param string $nota
     *
     * @return MovStockTec
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
     * Set type
     *
     * @param integer $type
     *
     * @return MovStockTec
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return integer
     */
    public function getType()
    {
        return $this->type;
    }
}
