<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;

    protected $fillable = ['hash'];

}
