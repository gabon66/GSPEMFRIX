<?php

namespace GSPEM\GSPEMBundle\Entity;

/**
 * StockSitio
 */
class StockSitio
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
    private $sitio;

    /**
     * @var integer
     */
    private $material;

    /**
     * @var integer
     */
    private $cant;


    /**
     * Set sitio
     *
     * @param integer $sitio
     *
     * @return StockSitio
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
     * Set material
     *
     * @param integer $material
     *
     * @return StockSitio
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
     * Set cant
     *
     * @param integer $cant
     *
     * @return StockSitio
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
