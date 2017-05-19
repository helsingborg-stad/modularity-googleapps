<?php

/**
 * Plugin Name:       Modularity Google Apps
 * Plugin URI:        https://github.com/helsingborg-stad/modularity-google.apps
 * Description:       Adds Google Apps modules to Modularity
 * Version:           1.0.0
 * Author:            Kristoffer Svanmark
 * Author URI:        https://github.com/helsingborg-stad
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       modularity-google-apps
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('MODULARITYGOOGLEAPPS_PATH', plugin_dir_path(__FILE__));
define('MODULARITYGOOGLEAPPS_URL', plugins_url('', __FILE__));
define('MODULARITYGOOGLEAPPS_TEMPLATE_PATH', MODULARITYGOOGLEAPPS_PATH . 'templates/');

load_plugin_textdomain('modularity-google-apps', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once MODULARITYGOOGLEAPPS_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once MODULARITYGOOGLEAPPS_PATH . 'Public.php';

// Acf auto import and export
add_action('plugins_loaded', function () {
    $acfExportManager = new \AcfExportManager\AcfExportManager();
    $acfExportManager->setTextdomain('modularity-google-apps');
    $acfExportManager->setExportFolder(MODULARITYGOOGLEAPPS_PATH . 'acf-fields/');
    $acfExportManager->autoExport(array(
        'google-calendar' => 'group_57c7f28ccb77e'
    ));
    $acfExportManager->import();
});

// Instantiate and register the autoloader
$loader = new ModularityGoogleApps\Vendor\Psr4ClassLoader();
$loader->addPrefix('ModularityGoogleApps', MODULARITYGOOGLEAPPS_PATH);
$loader->addPrefix('ModularityGoogleApps', MODULARITYGOOGLEAPPS_PATH . 'source/php/');
$loader->register();

// Start application
new ModularityGoogleApps\App();
