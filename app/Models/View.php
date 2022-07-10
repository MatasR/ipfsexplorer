<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;

    protected $fillable = ['hash', 'loaded'];

    // Used in ViewCrudController for a button
    public function openPreview() {
      return '<a class="btn btn-sm btn-link" target="_blank" href="/ipfs/'.$this->hash.'"><i class="la la-search"></i> Watch</a>';
    }

}
