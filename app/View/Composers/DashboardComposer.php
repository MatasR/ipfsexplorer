<?php

namespace App\View\Composers;

use Illuminate\View\View;
use App\Models\View as FileView;

class DashboardComposer
{
    public function compose(View $view)
    {
        $views = FileView::get();
        $viewsLoaded = $views->where('loaded')->count();
        $rate = number_format($viewsLoaded / $views->count() * 100, 2);

        $view->with([
          'count' => [
            'all' => $views->count(),
            'loaded' => $viewsLoaded
          ],
          'rate' => $rate
        ]);
    }
}
