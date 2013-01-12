/**
 * Created with JetBrains PhpStorm.
 * User: shared
 * Date: 1/11/13
 * Time: 9:13 PM
 * shogishack.net(c)
 * To change this template use File | Settings | File Templates.
 */
/*jslint browser: true*/
/*global  $, SSHACK */
$(function () {
    SSHACK.board.setupBoard();
    SSHACK.mover.initializeBoards();
    SSHACK.mover.setupButtons();
});

