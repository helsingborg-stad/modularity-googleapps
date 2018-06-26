<?php

namespace ModularityGoogleApps;

class App
{
    public function __construct()
    {
        add_action('plugins_loaded', function () {
            if (function_exists('modularity_register_module')) {
                modularity_register_module(
                    MODULARITYGOOGLEAPPS_PATH . 'source/php/Module/', // The directory path of the module
                    'Calendar' // The class' file and class name (should be the same) withot .php extension
                );
            }
        });

        add_action('wp_enqueue_scripts', array($this, 'enqueue'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueApi'), 15);
    }

    public function enqueue()
    {
        wp_register_style('modularity-google-apps', MODULARITYGOOGLEAPPS_URL . '/dist/css/modularity-google-apps.min.css', null, '1.0.0');
        wp_enqueue_style('modularity-google-apps');

        wp_register_script('modularity-google-apps', MODULARITYGOOGLEAPPS_URL . '/dist/js/modularity-google-apps.min.js', null, '1.0.0', true);
        wp_enqueue_script('modularity-google-apps');
    }

    public function enqueueApi()
    {
        wp_localize_script('modularity-google-apps', 'ModularityGoogleAppsLang', array(
            'clientId' => get_option('modularity-g-calendar-client-id', ''),
            'calendar' => array(
                'permissionError' => __('Your Google Accound does not have permission to view this calendar.', 'modularity-google-apps'),
                'loginMessage' => __('You need to login with your Google Account to view this calendar.', 'modularity-google-apps'),
                'login' => __('Log in')
            )
        ));

        wp_register_script('google-client', 'https://apis.google.com/js/client.js?onload=modularityGoogleApps', null, '1.0.0', true);
        wp_enqueue_script('google-client');
    }
}
