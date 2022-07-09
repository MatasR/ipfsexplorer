@extends(backpack_view('blank'))

@php
    $widgets['before_content'][] = [
        'type'        => 'progress',
        'class'       => 'card text-white bg-primary mb-2',
        'value'       => $rate.'%',
        'description' => 'Load success rate',
        'progress'    => $rate,
        'hint'        => $count['all'].' out of '.$count['loaded'].' files were loaded successfully'
    ];
@endphp

@section('content')
@endsection
