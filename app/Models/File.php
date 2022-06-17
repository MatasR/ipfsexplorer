<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;

    protected $fillable = ['hash'];

}
