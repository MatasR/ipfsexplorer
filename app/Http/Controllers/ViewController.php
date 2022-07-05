<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\View;

class ViewController extends Controller
{

    public function store(Request $request)
    {
        // $file = View::create(['hash' => $request->hash]);
        $file = View::updateOrCreate(['hash' => $request->hash]);
    }

}
