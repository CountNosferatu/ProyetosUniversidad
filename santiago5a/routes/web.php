<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

Route::get('/', function () { 
    return view('index'); 
})->middleware('auth');

Route::resource('items', ItemController::class);

Auth::routes(['register'=>false]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('items', [ItemController::class, 'index'])->name('items.index');