<?php

namespace Pokupo\BlogBundle\Util\UnitConverter\Extension\fr;

use Pokupo\BlogBundle\Util\UnitConverter\BaseRatioUnitProvider;

/**
 * Description of DistanceUnitProvider
 *
 * @author michel
 */
class TimeUnitProvider extends BaseRatioUnitProvider {
    
    /**
     * {@inheritDoc}
     */
    public function getRatios() {
        return array(
            'seconde'  => 1,
            'secondes' => 1,
            'minute'   => 60,
            'minutes'  => 60,
            'heure'    => 60*60,
            'heures'   => 60*60,
        );
    }

    /**
     * {@inheritDoc}
     */
    public function getLocale() {
        return 'fr';
    }

    /**
     * {@inheritDoc}
     */
    public function getUnit() {
        return self::TIME;
    }
}
