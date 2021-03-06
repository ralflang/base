==============================
 Installing Horde Framework 5
==============================

:Contact: horde@lists.horde.org

.. contents:: Contents
.. section-numbering::

This document contains instructions for installing the Horde Framework on your
system.

The Horde Framework, by itself, does not provide any significant end user
functionality; it provides a base for other applications and tools for
developers. When you have installed Horde as described below, you will
probably want to install some of the available Horde applications, such as
IMP_ (a webmail client), or Kronolith_ (a calendar). There is a list of Horde
applications and projects at http://www.horde.org/apps.

If you are interested in developing applications for Horde, there is developer
documentation and references available at http://dev.horde.org/, and some
tutorials and papers on Horde available at
http://www.horde.org/community/papers.

For information on the capabilities and features of Horde, see the file
README_ in the top-level directory of the Horde distribution.

.. _IMP: http://www.horde.org/apps/imp
.. _Kronolith: http://www.horde.org/apps/kronolith


Quick Install
=============

These are very terse instructions how to install Horde and its prerequisites
on a LAMP_ (Linux, Apache, MySQL, PHP) sytem.  They are addressed to
experienced administrators who know exactly what they are doing.  For more
detailed instructions, start reading below at Prerequisites_.

1. Compiling PHP for Apache 2::

     cd php-x.x.x/
     ./configure --with-apxs2=/usr/sbin/apxs2 \
                 --with-gettext --enable-mbstring --with-gd \
                 --with-png-dir=/usr --with-jpeg-dir=/usr \
                 [--with-mysql|--with-pgsql|--with-ldap]
                 [--with-tidy]
     make
     make install

2. Restart Apache.

3. Make sure your PEAR package is up-to-date::

     pear upgrade PEAR

4. Register Horde PEAR channel::

     pear channel-discover pear.horde.org

5. Set Horde installation directory::

     pear install horde/horde_role
     pear run-scripts horde/horde_role

6. Install Horde::

     pear install -a -B horde/horde

7. Configure Horde::

     cd config/
     cp conf.php.dist conf.php

8. Finish configuration::

     http://your-server/horde/

   Go to Administration => Configuration => Horde
   (Or navigate to http://your-server/horde/admin/config)

9. Create database tables

   Go to Administration => Configuration. Click ``Update All DB Schemas``.

10. Test Horde (optional)

   Enable the test script in the Horde configuration at the ``General`` in the
   ``PHP Settings`` section, or edit ``horde/config/conf.php`` and set
   ``'testdisable'`` to false.

   Go to::

     http://your-server/horde/test.php

   .. Important:: Disable the test script again after you are done.

.. _LAMP: http://www.wikipedia.org/wiki/LAMP_(software_bundle)


Prerequisites
=============

The following prerequisites are **REQUIRED** for Horde to function properly.

1. A webserver that supports PHP.

   Horde is primarily developed under the Apache and Lighttpd webservers,
   which we recommend.  These servers are available from:

      - http://httpd.apache.org/
      - http://www.lighttpd.net/

2. PHP 5.3.0 or above.

   PHP is the interpreted language in which Horde is written.

   You can obtain PHP sources at::

      http://www.php.net/

   .. Note:: Although the PHP 5.3 API is supported, for stability, performance,
      and security reasons it is **HIGHLY RECOMMENDED** to use a version of
      PHP >= 5.4.0.

   .. Note:: While it may be possible to install PHP using the package manager
      for your operating system, it is not recommended to do so if your
      distribution (e.g. Debian) does NOT update the actual PHP version in
      its package updates. Otherwise, you will be stuck with a PHP version that
      does not contain the most recent bug and security patches. On these
      systems, it is **HIGHLY RECOMMENDED** to either install PHP from source
      OR use a 3rd party package repository that contains the most recently
      released PHP version on the branch (5.4, 5.5, etc.) that you want to use.

   Follow the instructions in the PHP package to build PHP for your system. If
   you use Apache, be sure to build PHP as a library with one of the following
   options::

       --with-apache
       --with-apxs
       --with-apxs2

   options to ``./configure``, and not as a standalone executable.

   The following PHP extensions respective options are **REQUIRED** by Horde
   (listed with their own prerequisites and configure options). In many cases,
   the required libraries and tools can be obtained as packages from your
   operating system vendor.

   a. Gettext support. ``--with-gettext``

      Gettext is the GNU Translation Project's localization library.
      Horde uses gettext to provide local translations of text displayed by
      applications. Information on obtaining the gettext package is available
      at

         http://www.gnu.org/software/gettext/gettext.html

      See also note below on configuring Translations_.

      All Horde translations are stored in UTF-8, so your underlying system
      MUST support UTF-8 for all locales that you wish to provide translation
      support for.

   b. XML and DOM support.

      XML and DOM support are enabled in PHP 5 by default. You only have to
      make sure that you do **not** use ``--disable-dom``,
      ``--disable-simplexml``, or ``--disable-xml``.

      Make sure you are using a newer (v2.7 or greater) version of libxml.
      Older versions of libxml are broken when handling certain charsets.

   The following PHP options are **RECOMMENDED** to enable advanced features in
   Horde:

   a. File Upload Support

      File upload support is **REQUIRED** by many applications to allow
      advanced features to work. To enable file upload support:

          1. In your php.ini file, the following line **must** be present::

                file_uploads = On

          2. Your temporary upload directory **must** be writable to the user
             the web server is running as.  If you leave the configuration
             option ``upload_tmp_dir`` blank in ``php.ini``, PHP will use the
             default directory compiled into it (normally ``/tmp`` on
             Unix-like systems).

          3. Set the maximum size of the uploaded files via the
             ``upload_max_filesize`` configuration option in ``php.ini``.  For
             example, to allow 5 MB attachments, place the following line in
             your ``php.ini`` file::

                upload_max_filesize = 5M

       If either ``file_uploads`` is turned off, or your temporary upload
       directory is *not* writable by the server, all file upload
       functionality will be disabled by Horde and will not be available to
       the user.

       See the `File Uploads`_ FAQ entry for further information.

   b. A preferences container.

      Horde applications can store user preferences in a variety of backends.
      Common storage backends include an SQL database, an LDAP directory, a
      Kolab server, local files, a NoSQL database, or in PHP sessions.

      For SQL database preferences storage, Horde is thoroughly tested on
      MySQL(i) (``--with-mysql(i)``), PostgreSQL (``--with-pgsql``), and
      SQLite (enabled by default in PHP). LDAP and/or Kolab (``--with-ldap``)
      is another common storage backend. NoSQL support is provided through
      MongoDB.

      Alternatively, preferences can be stored in PHP sessions, which
      requires no external programs or configure options, but which will not
      maintain preferences between sessions.

      While the SQL, LDAP, or Kolab server need not be running on the machine
      on which you are installing Horde, the appropriate client libraries to
      access the server must be available locally.

      If a preference container is not configured, no preference options
      will be configurable via Horde's web interface - the default values
      stored in each applications ``config/prefs.php`` file will be used.

   c. Multibyte character support (mbstring and iconv extensions) ``--enable-mbstring``

      If these extensions are enabled, Horde can better support multibyte
      character sets.

      For iconv support you should use the GNU libiconv library, which is more
      stable and supports more charsets, compared to other iconv
      implementations, like Solaris', for example.

      Iconv support is enabled by default in PHP 5. You only have to make sure
      that you do **not** use ``--without-iconv``

   d. GD support ``--with-gd``

      Horde will use the GD extension to perform manipulations on image data
      through the Horde_Image library.

      If you want GD to be able to work with PNG images, you should use the
      ``--with-png-dir`` option to make sure PHP can find the PNG libraries
      it needs to compile.

      If you want GD to be able to work with JPEG images, you should use the
      ``--with-jpeg-dir`` option to make sure PHP can find the JPEG libraries
      it needs to compile.

      You can also use the imagick_ extension or the ImageMagick_ package to do
      these manipulations instead. The imagick_ extension is the recommended
      method for image manipulation. See the ``Image Manipulation`` tab of the
      Horde configuration for more details. ImageMagick version 6.5.7 or better
      is recommended.

      .. _imagick: http://pecl.php.net/package/imagick
      .. _ImageMagick: http://www.imagemagick.org

   e. tidy ``--with-tidy``

      The tidy PHP extension is required to sanitize HTML data.

   .. Important:: Additionally, individual Horde applications may **REQUIRE**
                  or **RECOMMEND** other options to be built into PHP
                  also. Please check ``doc/INSTALL`` for all applications you
                  wish to use to see if other PHP options are needed.

   f. fileinfo

      Allows Horde applications to guess the MIME type of files by analyzing
      their contents.

      This extension is automatically enabled by default.

   g. _`curl` ``--with-curl``

      The `curl extension`_, if installed, will be used instead of PHP's
      fopen() when retrieving data from external HTTP servers (remote
      calendars, web APIs, etc.). This is much more reliable and flexible, so
      it is recommended to either enable it or install the http_ extension.

      This extension can be enabled by adding the ``--with-curl`` option when
      compiling PHP.

3. PEAR Modules

   PEAR is short for "PHP Extension and Application Repository".  The goal of
   PEAR is to provide a means of distributing reusable code.

   For more information, see http://pear.php.net/

   .. Important:: Make sure you are running a supported (i.e. new enough)
                  version of PEAR: use the test script described below under
                  "`Configuring Horde`_".  Do **not** use the PEAR version
                  from ftp.horde.org.

   Check that the path where the PEAR packages are installed are part of the
   ``include_path`` parameter that PHP uses to find PEAR packages.

   Run the command::

     pear config-show

   You will see something like::

     PEAR directory   php_dir   /usr/share/php

   Now open the php.ini file of your system, for example ``/etc/php.ini``,
   find the ``include_path`` and make sure that ``/usr/share/php`` is part of
   the list.  If you had to change that value, restart the web server after
   saving ``php.ini``.

   .. Important:: If you are going to install Horde the recommended way,
                  i.e. using the PEAR installer, you can skip the remainder of
                  this section. Installing Horde through PEAR will
                  automatically download and install all required PEAR
                  packages.

   These PEAR packages are **RECOMMENDED** to be installed:

   a. Net_DNS2

      If installed, it will be used instead of the built-in PHP function
      gethostbyaddr() for host name lookups. This has the advantage that
      Net_DNS2 has configurable timeouts and retries.
      To install, enter the following at the command prompt::

        pear install Net_DNS2

   b. File_Fstab

      Required only if you use the localhost driver for the Accounts block.
      To install, enter the following at the command prompt::

        pear install File_Fstab

   This method of installing PEAR packages requires that you have a PHP version
   that has been compiled as a static binary.  All versions of PHP build both
   both a SAPI module (Apache, CGI, etc.) and a command-line (CLI) binary.
   Check if you have a php binary in ``/usr/local/bin`` (``/usr/bin`` if you
   installed from an operating system package) before recompiling.

   For more detailed directions on installing PEAR packages, see the PEAR
   documentation at http://pear.php.net/manual/

4. PECL Modules

   PECL is short for "PHP Extension Community Library".  The goal of PECL is
   to provide a means of easily distributing PHP extensions.

   For more information, see http://pecl.php.net/

   PECL is the "sister" of PEAR and uses the same packaging and distribution
   system as PEAR, so the configuration/setup is essentially identical to the
   PEAR instructions above.

   When you install a PECL extension, you have to add it to your ``php.ini``
   so it gets loaded.  Add the following line to your ``php.ini`` file to load
   the extension (the extension should be installed in the directory specified
   by the ``extension_dir`` option in ``php.ini``)::

     extension=fileinfo.so

   Or on Windows::

     extension=fileinfo.dll

   After that, restart your webserver.

   These PECL packages are **RECOMMENDED** to be installed:

   a. imagick

      The imagick extension can be used by Horde's image library to provide
      image manipulations.

      To install, enter the following at the command prompt::

        pecl install imagick

      The imagick extension **must** be compiled against ImageMagick version
      6.2.9 or better, though version 6.5.7 or better is recommended.

   b. horde_lz4

      If the horde_lz4 extension is available, Horde can perform real-time
      compression on data, resulting in reduced storage load on the server for
      things like cache storage and session data. It is highly recommended.

      To install, enter the following at the command prompt::

        pecl install horde/horde_lz4

   c. memcache

      If using memcache, the memcache PECL extension must be installed.

      To install, enter the following at the command prompt::

        pecl install memcache

   d. _`http`

      The `http extension`_, if installed, will be used instead of PHP's
      fopen() when retrieving data from external HTTP servers (remote
      calendars, web APIs, etc.). This is much more reliable and flexible, so
      it recommended to either install this or enable the curl_ extension.

      To install, enter the following at the command prompt::

        pecl install http

   For additional help on using the pear command-line program to install PECL
   extensions, see the PEAR installation section above.


The following non-PHP prerequisites are **RECOMMENDED**.

1. aspell - Spelling Checker

   Aspell, a comand-line program, is used as Horde's spell-checking engine.
   You must install and configure aspell to use Horde's spell-check feature.

   Version 0.60 or higher is REQUIRED.

   You can obtain aspell from:

      http://aspell.sourceforge.net/


The following non-PHP prerequisites are optional.

1. Sendmail.

   It is highly **RECOMMENDED** that Horde be configured to use SMTP for
   sending e-mails.

   Alternatively, Horde can use the local sendmail program, or a program that
   implements the ``sendmail(8)`` API (as included with postfix, qmail, and
   exim, among others). However, local use of sendmail binaries to send mail
   is discouraged due to authentication/permission issues (since Horde will
   invoke the sendmail binary as the web/PHP user), and because it is not
   possible to reliably auto-configure sendmail since there is no unified
   API across platforms/sendmail variants.


Installing Horde
================

The **RECOMMENDED** way to install Horde is using the PEAR installer.
Alternatively, if you want to run the latest development code or get the
latest not yet released fixes, you can install Horde from Git.


Installing with PEAR
~~~~~~~~~~~~~~~~~~~~

Before beginning, make sure your PEAR package is up-to-date::

   pear upgrade PEAR

Next, you need to register the Horde PEAR channel server to your local PEAR
system. This has to be done only **once** ever on a single PEAR system::

   pear channel-discover pear.horde.org

Next install a so-called "role" for Horde. This role defines where Horde is
installed. This should be a directory in your web server's web root, e.g.
``/var/www/horde``. Again this has to be done only **once** ever on
a single PEAR system::

   pear install horde/horde_role
   pear run-scripts horde/horde_role

When installing Horde through PEAR now, the installer will automatically
install any dependencies of Horde too.  If you want to install Horde with all
optional dependencies, but without the binary PECL packages that have to be
compiled, specify both the ``-a`` and the ``-B`` flag::

   pear install -a -B horde/horde

By default, only the required dependencies will be installed::

   pear install horde/horde

If you want to install Horde even with all binary dependencies, you need to
remove the ``-B`` flag. Please note that this might also try to install PHP
extensions through PECL that might need further configuration or activation in
your PHP configuration::

   pear install -a horde/horde


Installing into separate PEAR
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. Warning:: Unless you really know **why** you want to do this, you probably
             do **not** want to do this. Use the general PEAR installation
             instructions from above instead.

If you want to create a separate PEAR installation for installing Horde,
independent from the system-wide PEAR installation, this can be done with the
following commands (in this example, ``/var/www/horde`` is used as the
location of the web-accessible horde directory)::

   mkdir /var/www/horde
   pear config-create /var/www/horde /var/www/horde/pear.conf
   pear -c /var/www/horde/pear.conf install pear

Then follow the regular installation steps, but use the ``pear`` command from
the PEAR installation you just created, e.g.::

   /var/www/horde/pear/pear -c /var/www/horde/pear.conf channel-discover \
       pear.horde.org

Finally configure your web server in some way to point PHP's ``include_path``
setting to the PEAR installation and the ``PHP_PEAR_SYSCONF_DIR`` environment
variable to the directory used during the config-create command::

   php_value include_path /var/www/horde/pear/php
   SetEnv PHP_PEAR_SYSCONF_DIR /var/www/horde

It is recommended to not use the .htaccess file in ``/var/www/horde/`` to set
these values because it will be overwritten with every further update.


Installing from Git
~~~~~~~~~~~~~~~~~~~

See http://www.horde.org/development/git


Configuring Horde
=================

1. Configuring the web server

   Horde requires the following webserver settings. Examples shown are for
   Apache; other webservers' configurations will differ.

   a. PHP interpretation for files matching ``*.php``::

         AddType application/x-httpd-php .php

      .. Note:: The above instructions may not work if you have specified PHP
                as an output filter with ``SetOutputFilter`` directive in
                Apache 2.x versions.  In particular, Red Hat 8.0 and above
                Apache 2.x RPMS have the output filter set, and **MUST NOT**
                have the above ``AddType`` directive added.

   b. ``index.php`` as an index file (brought up when a user requests a URL for
      a directory)::

         DirectoryIndex index.php

   c. If you plan to provide ActiveSync support to your users, you have to
      create an alias of the ``/Microsoft-Servers-ActiveSync`` URL to
      ``/horde/rpc.php``. See http://wiki.horde.org/ActiveSync for details.

   c. If you plan to provide CardDAV support to users with iOS devices, you
      have to create an alias of the ``/.well-known/carddav`` URL to
      ``/horde/rpc.php``. See http://wiki.horde.org/CardDAV for details.

2. Configuring Horde

   To configure Horde, change to the ``config/`` directory of the installed
   distribution, and copy the ``conf.php.dist`` configuration file to
   ``conf.php``.

   Documentation on the format and purpose of the configuration files in the
   ``config/`` directory can be found in each file. The defaults will be
   correct for most sites. If you wish to customize Horde's appearance and
   behavior, create "local" files for the configuration file you want to
   change. For example if you want to change the default value and lock a
   preference, create a ``config/prefs.local.php`` file with the following
   content::

      <?php
      $_prefs['prefname']['value'] = 'somedefault';
      $_prefs['prefname']['locked'] = true;

   This works with any configuration file.

   .. Warning:: All configuration files in Horde are PHP scripts that are
                executed by the web server. If you make an error in one of
                these files, Horde might stop working. Thus it is always a good
                idea to test the configuration files after you edited them. If
                you want to test mime_drivers.local.php for example run::

                   php -l mime_drivers.local.php

3. Completing Configuration

   You can now access Horde without a password, and you will be logged in as
   an administrator.

   .. Important:: You should first configure a real authentication
                  backend and designate which accounts in your real
                  backend will be administrator accounts.  Horde does
                  **NOT** have a default administrator account - all
                  users, including administrators, must exist in the
                  actual authentication backend.  Click on ``Configuration``
                  in the ``Administration`` menu and configure Horde.
                  Start in the ``Authentication`` tab.

   Here is an example for configuring authentication against a remote IMAP
   server.  Similar steps apply for authenticating against a database, an LDAP
   server, etc.

   .. NOTE:: This is an example/testing configuration only, and should **NOT**
             be used if you intend to install IMP (Internet Message Program)
             and authenticate to the remote mail server. Please see the IMP
             documentation for further details.

   a. In the ``Which users should be treated as administrators`` field enter a
      comma separated list of user names of your choosing. This will control
      who is allowed to make configuration changes, see passwords, potentially
      add users, etc.

   b. In the ``What backend should we use for authenticating users to Horde``
      pulldown menu select ``IMAP authentication``. The page will reload and
      you will have specific options for IMAP authentication.

   c. In the ``Configuration type`` pulldown menu select ``Separate values``.
      The page will reload with additional options. Fill in the remaining
      three fields appropriately:

      - IP name/number of the IMAP server
      - For a secure connection, select port 993.
      - Select the secure connection protocol to use, if desired.

   Continue to configure Horde through all the tabs of the configuration
   interface and click on ``Generate Horde Configuration``. An important item
   that you probably want to configure is the ``Database Settings``, which
   defines the database configuration that is used, by default, for several
   different Horde sub-systems.

   .. Important:: By default Horde will be using database backends for most
                  sub-systems. If you do not plan to use a database with Horde,
                  you need to go through all tabs of the configuration screen
                  and change the configuration for those systems from ``SQL``
                  to a suitable alternative.

   Configuration of applications in ``registry.php`` is documented in the
   ``INSTALL`` file of each application.  Most applications require you to
   configure them with a "Horde administrator" account.  A Horde administrator
   account is any normal Horde account that has been added to the administrator
   list in the ``Authentication`` tab of the Horde configuration.

   The other files in that directory need only be modified if you wish to
   customize Horde's appearance or behaviour -- the defaults will work at most
   sites.

4. Creating databases

   Once you created the database configuration in the previous step, you can
   create all database tables by hitting the ``Update all DB schemas`` button
   in the configuration screen.

   Please note that this requires the database that you entered in the database
   configuration to already exist, and the configured database user to have
   sufficient permissions to create new tables in this database.

   Alternatively you can run the ``horde-db-migrate`` script in the Horde
   directory from the command line.

   If you installed Horde into the global PEAR system, this script should be in
   your command path. If the script cannot be found in your path, you need to
   specify the full path to the script, e.g.::

      /var/www/horde/pear/horde-db-migrate

   You can use the ``pear`` command to find the place where the script has been
   installed::

      pear config-get bin_dir

   If you installed into a local PEAR installation, you need to tell PHP and
   PEAR where to find the installation and the script, e.g.::

      PHP_PEAR_SYSCONF_DIR=/var/www/horde php \
          -d include_path=/var/www/horde/pear/php \
          /var/www/horde/pear/horde-db-migrate

5. Setting up alarm emails

   If you want your users to be able to receive emails from the Horde_Alarm
   system, you must set up a cron entry for ``horde-alarms``, you
   must have at least one administrator specified in the Horde configuration,
   and you must have the PHP CLI installed (a CGI binary is not supported -
   ``php -v`` will report what kind of PHP binary you have).

   Running the job every 5 minutes is recommended::

      # Horde Alarms
      */5 * * * * /usr/bin/horde-alarms

   If not installing Horde through PEAR or if PEAR's ``bin_dir`` configuration
   doesn't point to ``/usr/bin/``, replace ``/usr/bin/horde-alarms`` with the
   path to the ``horde-alarms`` script in your Horde installation.

6. Testing Horde

   Once you have configured your webserver, PHP, and Horde, bring up the
   included test page in your Web browser to ensure that all necessary
   prerequisites have been met. If you installed Horde as described above, the
   URL to the test page would be::

      http://your-server/horde/test.php

   The test script is disabled by default for security reasons. To enable
   set the 'testdisable' configuration option to false. After testing is
   completed, the testdisable option should be reset to true.

   Check that your PHP and PEAR versions are acceptably recent, that all
   required capabilities are present, and that ``magic_quotes_runtime``
   is set to ``Off``. Then note the ``Session counter: 1`` line under ``PHP
   Sessions``, and reload the page. The session counter should increment.

   If you get a warning like ``Failed opening '/path/to/test.php' for
   inclusion``, make sure that the web server has the permission to read the
   ``test.php`` file.

7. Securing Horde

   a. Passwords

      Some of Horde's configuration files contain passwords which local users
      could use to access your database.  It is recommended to ensure that at
      least the Horde configuration files (in ``config/``) are not readable to
      system users.  There are ``.htaccess`` files restricting access to
      directories that do not need to be accessed directly; before relying on
      those, ensure that your webserver supports ``.htaccess`` and is
      configured to use them, and that the files in those directories are in
      fact inaccessible via the browser.

      An additional approach is to make Horde's configuration files owned by
      the user ``root`` and by a group which only the webserver user belongs
      to, and then making them readable only to owner and group.  For example,
      if your webserver runs as ``www.www``, do as follows::

         chown -R root.www config/*
         find config/ -type f -exec chmod 0440 '{}' \;

   b. Sessions

      Session data -- including hashed versions of your users' passwords, in
      some applications -- may not be stored as securely as necessary.

      If you are using file-based PHP sessions (which are the default), be
      sure that session files are not being written into ``/tmp`` with
      permissions that allow other users to read them. Ideally, change the
      ``session.save_path`` setting in ``php.ini`` to a directory only
      readable and writeable by your webserver.

      Additionally, you can change the session handler of PHP to use any
      storage backend requested (e.g. SQL database) via the ``Custom Session
      Handler`` tab in the Horde configuration.

   For more information about securing your webserver, PHP and Horde, see the
   `doc/SECURITY`_ file.


Dynamic View Troubleshooting
============================

Horde's dynamic, AJAX-based views differ from traditional Horde applications in
that they require javascript support; in fact, javascript performs the bulk of
the page display.  As such, debugging the dynamic views is more complex than
with other Horde applications.

If you run into problems with the dynamic view, first follow the
troubleshooting steps for Horde - namely checking PHP error logs and Horde
debug logs to determine if the problem is located there.  Server-based errors
will be logged in the traditional manner.

Only if traditional debugging is unsuccessful will you need to move to
javascript debugging.  It is highly recommended to use Mozilla Firefox with
the `Firebug`_ extension installed in order to better track javascript
errors - it is what the developers use and makes deciphering error codes and
error line numbers much easier.  You will also want to turn off javascript
caching, if on, in ``horde/conf/conf.php``.

If you do find a javascript error, it would be great if you could fix the
issue and provide a patch :)  Absent that, before reporting to the mailing
list, IRC room, or bug tracker make sure you have a valid javascript error,
the file the error is being caused in, the line number of the error, and a
reliable way to reproduce the error.  Developers/other interested folks will
be much more likely to help you if all this information is provided.


Configuring Applications
========================

A list of available Horde applications can be found at

   http://www.horde.org/apps

Instructions on configuring Horde applications can be found in the ``INSTALL``
file in the application's ``doc/`` directory.


Temporary Files
===============

Various Horde applications will generate temporary files in PHP's temporary
directory (see the ``General`` tab in the Horde configuration).  For various
reasons, some of these files may not be removed when the user's session
ends. To reclaim this disk space, it may be necessary to periodically delete
these old temporary files.

An example cron-based solution can be found at
``horde/scripts/temp-cleanup.cron`` in PEAR's ``data_dir`` directory.  Another
possible solution is to use utilities like ``tmpwatch``, ``tmpreaper`` or
anything similar to remove old files.

Stale sessions are automatically pruned by PHP according to the
`session.gc_probability`_, `session.gc_divisor`_, and
`session.gc_maxlifetime`_ settings located in ``php.ini``.


Translations
============

Note for international users: Horde uses GNU gettext to provide local
translations of text displayed by applications; the translations are found in
the po/ directory.  If a translation is not yet available for your locale (and
you wish to create one), or if you're having trouble using a provided
translation, please see the doc/TRANSLATIONS_ file for instructions.


Obtaining Support
=================

If you encounter problems with Horde, help is available!

The Horde Frequently Asked Questions List (FAQ), available on the Web at

  http://wiki.horde.org/FAQ

The Horde Project runs a number of mailing lists, for individual applications
and for issues relating to the project as a whole. Information, archives, and
subscription information can be found at

  http://www.horde.org/community/mail

Lastly, Horde developers, contributors and users may also be found on IRC,
on the channel #horde on the Freenode Network (irc.freenode.net).

Please keep in mind that Horde is free software written by volunteers.
For information on reasonable support expectations, please read

  http://www.horde.org/community/support

Thanks for using Horde!

The Horde Team


.. _README: README
.. _doc/SECURITY: SECURITY
.. _doc/TRANSLATIONS: TRANSLATIONS
.. _`curl extension`: http://php.net/curl
.. _`http extension`: http://php.net/http
.. _`File Uploads`: http://wiki.horde.org/FAQ/Admin/FileUploads
.. _`Firebug`: http://www.getfirebug.com/
.. _`session.gc_probability`: http://www.php.net/manual/en/session.configuration.php#ini.session.gc-probability
.. _`session.gc_divisor`: http://www.php.net/manual/en/session.configuration.php#ini.session.gc-divisor
.. _`session.gc_maxlifetime`: http://www.php.net/manual/en/session.configuration.php#ini.session.gc-maxlifetime
