<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Email;

Route::get('/', function () {

    if (Auth::check()) {
        return Redirect::to( 'home');
    } else {
        return view('welcome');
    }
    
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/create', 'EmailController@create')->name('email.create');

Route::get('/edit/{id}', 'EmailController@edit')->name('email.edit');

Route::get('/destroy/{id}', 'EmailController@destroy')->name('email.destroy');

