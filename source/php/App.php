<?php

namespace ModularityGoogleApps;

class App
{
    public function __construct()
    {
        add_action('Modularity', function () {
            new \ModularityGoogleApps\Module\GoogleCalendar();
        });

        add_filter('acf/settings/load_json', array($this, 'jsonLoadPath'));
    }

    public function jsonLoadPath($paths)
    {
        $paths[] = MODULARITYGOOGLEAPPS_PATH . 'source/acf-json';
        return $paths;
    }
}
