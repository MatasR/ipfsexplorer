<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\File;

class FileController extends Controller
{

    public function store(Request $request)
    {
        $file = File::updateOrCreate(['hash' => $request->hash], ['hash' => $request->hash]);
        // Updates updated_at value (required if entry already exists)
        $file->touch();
    }

}
