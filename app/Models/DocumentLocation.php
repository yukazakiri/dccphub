<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/* CREATE TABLE `document_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birth_certificate` varchar(255) DEFAULT NULL,
  `form_138` varchar(255) DEFAULT NULL,
  `form_137` varchar(255) DEFAULT NULL,
  `good_moral_cert` varchar(255) DEFAULT NULL,
  `transfer_credentials` varchar(255) DEFAULT NULL,
  `transcript_records` varchar(255) DEFAULT NULL,
  `picture_1x1` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci */
class DocumentLocation extends Model
{
    use HasFactory;
    protected $fillable = [     
        'birth_certificate',
        'form_138',
        'form_137',
        'good_moral_cert',
        'transfer_credentials',
        'transcript_records',
        'picture_1x1',
    ];

    protected $table = 'document_locations';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
}   
