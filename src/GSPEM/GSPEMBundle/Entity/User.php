<?php

namespace GSPEM\GSPEMBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Mapping\ClassMetadata;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;

/**
 * User
 */
class User implements AdvancedUserInterface, \Serializable
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $crmClientId;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $username;

    /**
     * @var string
     */
    private $password;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var \DateTime
     */
    private $modifiedAt;

    /**
     * @var \DateTime
     */
    private $deletedAt;

    /**
     * @var boolean
     */
    private $disabled;

    /**
     * @var string
     */
    private $newsEmail;

    /**
     * @var \DateTime
     */
    private $expireDate;

    /**
     * @var \DateTime
     */
    private $lastBillingDate;

    /**
     * @var boolean
     */
    private $hidden;

    /**
     * @var boolean
     */
    private $changePassword;

    /**
     * @var \DateTime
     */
    private $lastLogin;

    /**
     * @var string
     */
    private $phone;

    /**
     * @var integer
     */
    private $view;




    public function isAccountNonExpired()
    {
        return true;
    }

    public function isAccountNonLocked()
    {
        if ($this->getDisabled()==0) {
            return true;
        }else {
            return false;
        }

    }

    /**
     * isCredentialsNonExpired
     *
     * @return void void
     */
    public function isCredentialsNonExpired()
    {
        return true;
    }

    /**
     * is enabled
     *
     * @return bool
     */
    public function isEnabled()
    {
        return true;
    }


    /**
     * isDeveloper
     *
     * @return void void
     */
    public function isDeveloper()
    {
        return true;
        //return $this->getInfo()->getIsDeveloper() ? true : false;
    }

    /**
     * loadValidatorMetadata
     *
     * @param ClassMetadata $metadata ClassMetadata
     *
     * @return void void
     */
    public static function loadValidatorMetadata(ClassMetadata $metadata)
    {
        $metadata->addConstraint(new UniqueEntity(array(
                'fields'  => array('username'),
            ))
        );
        $metadata->addConstraint(new UniqueEntity(array(
                'fields'  => array('newsEmail'),
            ))
        );
    }

    /**
     * (PHP 5 &gt;= 5.1.0)<br/>
     * String representation of object
     * @link http://php.net/manual/en/serializable.serialize.php
     * @return string the string representation of the object or null
     */
    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt,
        ));
    }

    /**
     * (PHP 5 &gt;= 5.1.0)<br/>
     * Constructs the object
     * @link http://php.net/manual/en/serializable.unserialize.php
     *
     * @param string $serialized <p>
     *                           The string representation of the object.
     *                           </p>
     *
     * @return void
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            // see section on salt below
            // $this->salt
            ) = unserialize($serialized);
    }

    /**
     * Returns the roles granted to the user.
     *
     * <code>
     * public function getRoles()
     * {
     *     return array('ROLE_USER');
     * }
     * </code>
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return Role[] The user roles
     */
    public function getRoles()
    {
        return array('ROLE_USER');
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        return;
    }


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->devices = new \Doctrine\Common\Collections\ArrayCollection();
        $this->disabled = false;

        $timeDefault = new \DateTime(date('Y-m-d H:i:s'));

        $this->setCreatedAt($timeDefault);
        $this->setModifiedAt($timeDefault);
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set crmClientId
     *
     * @param integer $crmClientId
     * @return Clients
     */
    public function setCrmClientId($crmClientId)
    {
        $this->crmClientId = $crmClientId;

        return $this;
    }

    /**
     * Get crmClientId
     *
     * @return integer
     */
    public function getCrmClientId()
    {
        return $this->crmClientId;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Clients
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
     * Set username
     *
     * @param string $username
     * @return Clients
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return Clients
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Clients
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set modifiedAt
     *
     * @param \DateTime $modifiedAt
     * @return Clients
     */
    public function setModifiedAt($modifiedAt)
    {
        $this->modifiedAt = $modifiedAt;

        return $this;
    }

    /**
     * Get modifiedAt
     *
     * @return \DateTime
     */
    public function getModifiedAt()
    {
        return $this->modifiedAt;
    }

    /**
     * Set deletedAt
     *
     * @param \DateTime $deletedAt
     * @return Clients
     */
    public function setDeletedAt($deletedAt)
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    /**
     * Get deletedAt
     *
     * @return \DateTime
     */
    public function getDeletedAt()
    {
        return $this->deletedAt;
    }

    /**
     * Set disabled
     *
     * @param boolean $disabled
     * @return Clients
     */
    public function setDisabled($disabled)
    {
        $this->disabled = $disabled;

        return $this;
    }

    /**
     * Get disabled
     *
     * @return boolean
     */
    public function getDisabled()
    {
        return $this->disabled;
    }

    /**
     * Set newsEmail
     *
     * @param string $newsEmail
     * @return Clients
     */
    public function setNewsEmail($newsEmail)
    {
        $this->newsEmail = $newsEmail;

        return $this;
    }

    /**
     * Get newsEmail
     *
     * @return string
     */
    public function getNewsEmail()
    {
        return $this->newsEmail;
    }

    /**
     * Set expireDate
     *
     * @param \DateTime $expireDate
     * @return Clients
     */
    public function setExpireDate($expireDate)
    {
        $this->expireDate = $expireDate;

        return $this;
    }

    /**
     * Get expireDate
     *
     * @return \DateTime
     */
    public function getExpireDate()
    {
        return $this->expireDate;
    }

    /**
     * Set lastBillingDate
     *
     * @param \DateTime $lastBillingDate
     * @return Clients
     */
    public function setLastBillingDate($lastBillingDate)
    {
        $this->lastBillingDate = $lastBillingDate;

        return $this;
    }

    /**
     * Get lastBillingDate
     *
     * @return \DateTime
     */
    public function getLastBillingDate()
    {
        return $this->lastBillingDate;
    }

    /**
     * Set hidden
     *
     * @param boolean $hidden
     * @return Clients
     */
    public function setHidden($hidden)
    {
        $this->hidden = $hidden;

        return $this;
    }

    /**
     * Get hidden
     *
     * @return boolean
     */
    public function getHidden()
    {
        return $this->hidden;
    }

    /**
     * Set changePassword
     *
     * @param boolean $changePassword
     * @return Clients
     */
    public function setChangePassword($changePassword)
    {
        $this->changePassword = $changePassword;

        return $this;
    }

    /**
     * Get changePassword
     *
     * @return boolean
     */
    public function getChangePassword()
    {
        return $this->changePassword;
    }

    /**
     * Set lastLogin
     *
     * @param \DateTime $lastLogin
     * @return Clients
     */
    public function setLastLogin($lastLogin)
    {
        $this->lastLogin = $lastLogin;

        return $this;
    }

    /**
     * Get lastLogin
     *
     * @return \DateTime
     */
    public function getLastLogin()
    {
        return $this->lastLogin;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return Clients
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set view
     *
     * @param integer $view
     * @return Clients
     */
    public function setView($view)
    {
        $this->view = $view;

        return $this;
    }

    /**
     * Get view
     *
     * @return integer
     */
    public function getView()
    {
        return $this->view;
    }
    /**
     * @ORM\PreUpdate
     */
    public function updatedTimestamps()
    {
        // Add your code here
    }
    /**
     * @var string
     */
    private $firstName;

    /**
     * @var string
     */
    private $lastName;

    /**
     * @var string
     */
    private $mail;


    /**
     * Set firstName
     *
     * @param string $firstName
     * @return Operator
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     * @return Operator
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set mail
     *
     * @param string $mail
     * @return Operator
     */
    public function setMail($mail)
    {
        $this->mail = $mail;

        return $this;
    }

    /**
     * Get mail
     *
     * @return string
     */
    public function getMail()
    {
        return $this->mail;
    }
    /**
     * @var integer
     */
    private $idAdmin;


    /**
     * Set idAdmin
     *
     * @param integer $idAdmin
     * @return Operator
     */
    public function setIdAdmin($idAdmin)
    {
        $this->idAdmin = $idAdmin;

        return $this;
    }

    /**
     * Get idAdmin
     *
     * @return integer
     */
    public function getIdAdmin()
    {
        return $this->idAdmin;
    }
    /**
     * @var string
     */
    private $token;


    /**
     * Set token
     *
     * @param string $token
     * @return Operator
     */
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Get token
     *
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }
    /**
     * @var integer
     */
    private $contratista;


    /**
     * Set contratista
     *
     * @param integer $contratista
     *
     * @return User
     */
    public function setContratista($contratista)
    {
        $this->contratista = $contratista;

        return $this;
    }

    /**
     * Get contratista
     *
     * @return integer
     */
    public function getContratista()
    {
        return $this->contratista;
    }
}
