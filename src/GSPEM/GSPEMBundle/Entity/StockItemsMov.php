<?php

namespace GSPEM\GSPEMBundle\Entity;

/**
 * SockItemsMov
 */
class StockItemsMov
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
    private $material;

    /**
     * @var integer
     */
    private $mov;


    /**
     * Set material
     *
     * @param integer $material
     *
     * @return StockItemsMov
     */
    public function setMaterial($material)
    {
        $this->material = $material;

        return $this;
    }

    /**
     * Get material
     *
     * @return integer
     */
    public function getMaterial()
    {
        return $this->material;
    }

    /**
     * Set mov
     *
     * @param integer $mov
     *
     * @return StockItemsMov
     */
    public function setMov($mov)
    {
        $this->mov = $mov;

        return $this;
    }

    /**
     * Get mov
     *
     * @return integer
     */
    public function getMov()
    {
        return $this->mov;
    }
    /**
     * @var integer
     */
    private $cant;


    /**
     * Set cant
     *
     * @param integer $cant
     *
     * @return StockItemsMov
     */
    public function setCant($cant)
    {
        $this->cant = $cant;

        return $this;
    }

    /**
     * Get cant
     *
     * @return integer
     */
    public function getCant()
    {
        return $this->cant;
    }
    /**
     * @var rechazado
     */
    private $rechazado;


    /**
     * Set rechazado
     *
     * @param \rechazado $rechazado
     *
     * @return StockItemsMov
     */
    public function setRechazado($rechazado)
    {
        $this->rechazado = $rechazado;

        return $this;
    }

    /**
     * Get rechazado
     *
     * @return \rechazado
     */
    public function getRechazado()
    {
        return $this->rechazado;
    }
}
