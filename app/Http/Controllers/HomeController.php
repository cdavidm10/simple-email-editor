<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $emails_collection = Auth::user()->emails;
        $emails_formatted = array_map(function($email) {
            $body_formatted = json_decode($email->body, true);
            $text_body = Str::limit($body_formatted['blocks'][0]['text'], 50, '...');
            $email->body = $text_body;
            $email->subject = Str::limit($email->subject, 20, '...');
            return $email;
        }, $emails_collection->all());
        $emails = collect($emails_formatted);
       
        return view('home', compact('emails'));
    }
}
