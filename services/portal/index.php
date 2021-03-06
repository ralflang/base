<?php
/**
 * Copyright 2003-2017 Horde LLC (http://www.horde.org/)
 *
 * See the enclosed file LICENSE for license information (LGPL-2). If you
 * did not receive this file, see http://www.horde.org/licenses/lgpl.
 *
 * @author   Mike Cochrane <mike@graftonhall.co.nz>
 * @category Horde
 * @license  http://www.horde.org/licenses/lgpl LGPL-2
 * @package  Horde
 */

require_once __DIR__ . '/../../lib/Application.php';
Horde_Registry::appInit('horde');

// Make sure we don't need the mobile view.
if ($registry->getView() == Horde_Registry::VIEW_SMARTMOBILE) {
    $registry->getServiceLink('portal')->redirect();
    exit;
}

// Get refresh interval.
if (($r_time = $prefs->getValue('summary_refresh_time'))
    && !$browser->hasFeature('xmlhttpreq')) {
    $page_output->metaRefresh($r_time, Horde::url('services/portal/'));
}

// Render layout.
$view = new Horde_Core_Block_Layout_View(
    $injector->getInstance('Horde_Core_Factory_BlockCollection')->create()->getLayout(),
    Horde::url('services/portal/edit.php'),
    Horde::url('services/portal/index.php', true)
);
$layout_html = $view->toHtml();
$injector->getInstance('Horde_View_Topbar')->subinfo =
    htmlspecialchars($injector->getInstance('Horde_Core_Factory_Identity')->create()->getDefaultFromAddress(true));

foreach ($view->getStylesheets() as $val) {
    $page_output->addStylesheet($val['fs'], $val['uri']);
}
$page_output->sidebar = false;

$page_output->header(array(
    'title' => _("My Portal")
));

if (!$prefs->isLocked('portal_layout')) {
    include HORDE_TEMPLATES . '/portal/new.inc';
}
$notification->notify(array('listeners' => 'status'));
echo $layout_html;
$page_output->footer();
