/**
 * Created with JetBrains PhpStorm.
 * User: shared
 * Date: 1/11/13
 * Time: 9:38 PM
 * shogishack.net(c)
 * To change this template use File | Settings | File Templates.
 */
/*jslint browser: true*/
/*global  $, SSHACK */

SSHACK.namespace("SSHACK.board");  // create SSHACK.board property
SSHACK.board.kifuList = [];  // prepare the empty kifulist array
$(function () {
    SSHACK.mover.prepAnimation();
});

