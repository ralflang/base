<?php
/**
 * Horde application registry.
 *
 * This configuration file is used by Horde to determine which Horde
 * applications are installed and where, as well as how they interact.
 *
 * IMPORTANT: DO NOT EDIT THIS FILE!
 * Local overrides MUST be placed in registry.local.php or registry.d/.
 * If the 'vhosts' setting has been enabled in Horde's configuration, you can
 * use registry-servername.php.
 *
 * NOTE: _() is an alias for the PHP gettext() function, which translates the
 * string within the parentheses into other languages.
 *
 * Application registry
 * --------------------
 * ALL settings are OPTIONAL:
 *
 *   - fileroot: (string) The base filesystem path for the module's files.
 *               DEFAULT: Auto-determined based on this file's location.
 *   - initial_page: (string) The initial page for the module.
 *                   DEFAULT: index.php
 *   - menu_parent: (string) The name of the 'heading' group that this app
 *                  should show up under. Not-needed for top-level items.
 *                  DEFAULT: null
 *   - name: (string) The human-readable name used in menus and descriptions
 *           for a module.
 *           DEFAULT: None (any publicly viewable element SHOULD have this
 *                    entry defined).
 *   - status: (string) One of the following:
 *     - active: [DEFAULT] Activate application.
 *     - admin: Activate application, but only for admins.
 *     - heading: Header label for application groups.
 *     - hidden: Enable application, but hide.
 *     - inactive: Disable application
 *     - link: Add a link to an external url
 *     - noadmin: Disable application for authenticated admins.
 *     - notoolbar: Activate application, but hide from menus and drop down
 *                  lists
 *     - topbar: Show in topbar only.
 *   - webroot: (string) The base URI path for the module.
 *              DEFAULT: Applications live one level below the base horde
 *                       directory.
 *
 * Advanced settings that normally do not need to be changed from the defaults
 * (at least during an initial installation):
 *
 *   - icon: (string) The URI for an icon to show in menus for the module.
 *           Setting this will override the default theme-based logic in the
 *           code.
 *   - jsfs: (string) The base filesystem path for static javascript files.
 *   - jsuri: (string) The base URI for static javascript files.
 *   - provides: (mixed) Service types the module provides.
 *   - target: (string) The target frame for the link.
 *   - templates: (string) The filesystem path to the templates directory.
 *   - themesfs: (string) The base file system directory for the themes.
 *   - themesuri: (string) The base URI for the themes. This can be used to
 *                serve all icons and style sheets from a separate server.
 *   - url: (string) The URL of 'heading' entries.
 *
 * Advanced settings, that ONLY apply to the 'horde' application, that
 * normally do not need to be changed from the defaults (at least during an
 * initial installation):
 *
 *   - staticfs: (string) The filesystem path for dynamically created files
 *               to be statically served.
 *   - staticuri: (string) The URI for the dynamically created files to be
 *                statically served.
 */

// By default, applications are assumed to live within the base Horde
// directory (e.g. their fileroot/webroot will be automatically determined
// by appending the application name to Horde's 'fileroot'/'webroot' setting.
// If your applications live in a different base directory, defining these
// variables will change the default directory without the need to change
// every application's 'fileroot'/'webroot' settings.
// $app_fileroot = __DIR__ . '../';
// $app_webroot = $this->_detectWebroot();

$this->applications = array(
    'horde' => array(
        'initial_page' => 'services/portal/index.php',
        'name' => _("Horde"),
        'provides' => 'horde',
    ),

    'imp' => array(
        'name' => _("Mail"),
        'provides' => array(
            'mail',
            'contacts/favouriteRecipients'
        )
    ),

    'ingo' => array(
        'name' => _("Filters"),
        'provides' => array(
            'filter',
            'mail/blacklistFrom',
            'mail/showBlacklist',
            'mail/whitelistFrom',
            'mail/showWhitelist',
            'mail/applyFilters',
            'mail/canApplyFilters',
            'mail/showFilters',
            'mail/newEmailFilter'
        ),
        'menu_parent' => 'imp'
    ),

    'sam' => array(
        'name' => _("Spam"),
        // Add this line to registry.local.php if you want Sam to handle the
        // blacklist and whitelist filters instead of Ingo:
        // $this->applications['sam']['provides'] = array('mail/blacklistFrom', 'mail/showBlacklist', 'mail/whitelistFrom', 'mail/showWhitelist');
        'menu_parent' => 'imp'
    ),

    'imp-menu' => array(
        'app' => 'imp',
        'menu_parent' => 'imp',
        'status' => 'topbar',
    ),

    'kronolith' => array(
        'name' => _("Calendar"),
        'provides' => 'calendar',
    ),

    'kronolith-menu' => array(
        'status' => 'topbar',
        'app' => 'kronolith',
        'topbar_params' => array(
            'id' => 'menu'
        ),
        'menu_parent' => 'kronolith',
    ),

    'turba' => array(
        'name' => _("Address Book"),
        'provides' => array(
            'contacts',
            'clients/getClientSource',
            'clients/clientFields',
            'clients/getClient',
            'clients/getClients',
            'clients/addClient',
            'clients/updateClient',
            'clients/deleteClient',
            'clients/searchClients'
        ),
    ),

    'turba-menu' => array(
        'app' => 'turba',
        'menu_parent' => 'turba',
        'status' => 'topbar',
    ),

    'nag' => array(
        'name' => _("Tasks"),
        'provides' => 'tasks',
    ),

    'nag-menu' => array(
        'status' => 'topbar',
        'app' => 'nag',
        'topbar_params' => array(
            'id' => 'menu'
        ),
        'menu_parent' => 'nag',
    ),

    'mnemo' => array(
        'name' => _("Notes"),
        'provides' => 'notes',
    ),

    'mnemo-menu' => array(
        'status' => 'topbar',
        'app' => 'mnemo',
        'menu_parent' => 'mnemo',
    ),

    'others' => array(
        'name' => _("Others"),
        'status' => 'heading',
    ),

    'trean' => array(
        'name' => _("Bookmarks"),
        'provides' => 'bookmarks',
        'menu_parent' => 'others'
    ),

    'ansel' => array(
        'name' => _("Photos"),
        'provides' => 'images',
        'menu_parent' => 'others'
    ),

    'wicked' => array(
        'name' => _("Wiki"),
        'provides' => 'wiki',
        'menu_parent' => 'others'
    ),

    'devel' => array(
        'name' => _("Development"),
        'status' => 'heading',
        'menu_parent' => 'others',
    ),

    'chora' => array(
        'name' => _("Version Control"),
        'menu_parent' => 'devel'
    ),

    'chora-menu' => array(
        'status' => 'topbar',
        'app' => 'chora',
        'menu_parent' => 'chora',
    ),

    'whups' => array(
        'name' => _("Tickets"),
        'provides' => 'tickets',
        'menu_parent' => 'devel',
    ),

    'whups-menu' => array(
        'status' => 'topbar',
        'app' => 'whups',
        'menu_parent' => 'whups',
    ),

    'luxor' => array(
        'name' => _("X-Ref"),
        'menu_parent' => 'devel'
    ),

    'info' => array(
        'name' => _("Information"),
        'status' => 'heading',
        'menu_parent' => 'others',
    ),

    'klutz' => array(
        'name' => _("Comics"),
        'menu_parent' => 'info'
    ),

    'jonah' => array(
        'name' => _("News"),
        'provides' => 'news',
        'menu_parent' => 'info'
    ),

    'jonah-menu' => array(
        'status' => 'topbar',
        'app' => 'jonah',
        'menu_parent' => 'jonah',
    ),

    'office' => array(
        'name' => _("Office"),
        'status' => 'heading',
        'menu_parent' => 'others',
    ),

    'hermes' => array(
        'name' => _("Time Tracking"),
        'menu_parent' => 'office',
        'provides' => 'time'
    ),

    'hermes-stopwatch' => array(
        'status' => 'topbar',
        'app' => 'hermes',
        'topbar_params' => array(
            'id' => 'stopwatch',
        ),
        'menu_parent' => 'hermes',
    ),

    'hermes-menu' => array(
        'status' => 'topbar',
        'app' => 'hermes',
        'topbar_params' => array(
            'id' => 'menu'
        ),
        'menu_parent' => 'hermes',
    ),

    'sesha' => array(
        'name' => _("Inventory"),
        /* Uncomment this line if you want Sesha to provide queue and
         * version names instead of Whups: */
        // 'provides' => array('tickets/listQueues', 'tickets/getQueueDetails', 'tickets/listVersions', 'tickets/getVersionDetails'),
        'menu_parent' => 'office',
    ),

    'kolab' => array(
        'name' => _("Kolab"),
        'menu_parent' => 'myaccount'
    ),

    'myaccount' => array(
        'name' => _("My Account"),
        'status' => 'heading',
        'menu_parent' => 'others',
    ),

    'gollem' => array(
        'name' => _("File Manager"),
        'menu_parent' => 'others',
        'provides' => 'files',
    ),

    'gollem-menu' => array(
        'status' => 'topbar',
        'app' => 'gollem',
        'menu_parent' => 'gollem',
    ),

    'passwd' => array(
        'name' => _("Password"),
        'menu_parent' => 'myaccount'
    ),

    'website' => array(
        'name' => _("Web Site"),
        'status' => 'heading',
        'menu_parent' => 'others',
    ),

    'agora' => array(
        'name' => _("Forums"),
        'provides' => 'forums',
        'menu_parent' => 'website'
    ),

    'ulaform' => array(
        'name' => _("Forms"),
        'menu_parent' => 'website'
    ),

    'vilma' => array(
        'name' => _("Mail Admin"),
        'menu_parent' => 'administration'
    ),

    'content' => array(
        'status' => 'hidden'
    ),

    'timeobjects' => array(
        'status' => 'hidden',
        'provides' => 'timeobjects'
    )
);
