<?php

namespace GSPEM\GSPEMBundle\Entity;

/**
 * StockTecnico
 */
class StockTecnico
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
    private $tecnico;


    /**
     * Set material
     *
     * @param integer $material
     *
     * @return StockTecnico
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
     * Set tecnico
     *
     * @param integer $tecnico
     *
     * @return StockTecnico
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
     * @var integer
     */
    private $cant;


    /**
     * Set cant
     *
     * @param integer $cant
     *
     * @return StockTecnico
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
}
