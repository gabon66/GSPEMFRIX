<?php

namespace GSPEM\GSPEMBundle\Entity;

/**
 * Contratista
 */
class Contratista
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
     * @var string
     */
    private $supervisor1;

    /**
     * @var string
     */
    private $supervisor2;

    /**
     * @var string
     */
    private $supervisor3;


    /**
     * Set name
     *
     * @param string $name
     *
     * @return Contratista
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
     * @return Contratista
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
     * Set supervisor1
     *
     * @param string $supervisor1
     *
     * @return Contratista
     */
    public function setSupervisor1($supervisor1)
    {
        $this->supervisor1 = $supervisor1;

        return $this;
    }

    /**
     * Get supervisor1
     *
     * @return string
     */
    public function getSupervisor1()
    {
        return $this->supervisor1;
    }

    /**
     * Set supervisor2
     *
     * @param string $supervisor2
     *
     * @return Contratista
     */
    public function setSupervisor2($supervisor2)
    {
        $this->supervisor2 = $supervisor2;

        return $this;
    }

    /**
     * Get supervisor2
     *
     * @return string
     */
    public function getSupervisor2()
    {
        return $this->supervisor2;
    }

    /**
     * Set supervisor3
     *
     * @param string $supervisor3
     *
     * @return Contratista
     */
    public function setSupervisor3($supervisor3)
    {
        $this->supervisor3 = $supervisor3;

        return $this;
    }

    /**
     * Get supervisor3
     *
     * @return string
     */
    public function getSupervisor3()
    {
        return $this->supervisor3;
    }
}
