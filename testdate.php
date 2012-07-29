<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 7/24/12
 * Time: 7:38 PM
 * snippet to display "New" or "updated" depending on the timestamp for
 * editedon and publishedon.   There is a logic bug in which if the publishedon is less than
 * 30days from today and then modified, it will still show as "New" and not "updated"
 * so the proper way to do this will be to.
 * check the publishedon is less than 30days.
 * if so, then show "NEW"
 * If editedOn is less than 30 days and (editedOn>publishedon) then show "Updated"
 * this will show "New"and "updated" in case it was published in less than 30 days and consequently updated
 * it will only show "Updated" if update has happened in less than 30 days but
 *
 * etc.,,
 * but I am OK with current implementation
 * To change this template use File | Settings | File Templates.
 */
if (isset($input)){$resource=$modx->getObject('modResource',$input);}
    else $resource=& $modx->resource;
    $created=$resource->get('publishedon');
    $edited=$resource->get('editedon');
    if ((time()-strtotime($created))<30*24*60*60)
        $output='New';
    elseif ((time()-strtotime($edited))<30*24*60*60)
        $output="Updated";
    return $output;