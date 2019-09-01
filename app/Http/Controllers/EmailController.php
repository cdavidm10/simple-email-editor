<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

use App\Email;

class EmailController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (Auth::check()) {
            return view('emails.form');
        } else {
            return Redirect::to( 'home');
        }       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'subject' => 'required',
            'body'    => 'required',
        ]);
        
        $email = Email::updateOrCreate(
            [
                'id' => $request->id
            ],[
                'subject' => $data['subject'],
                'body'    => $data['body'],
                'user_id' => Auth::user()->id
            ]
        );
        return response()->json('Email was successfully created');
    }

    /**
     * Get the email for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {
        $email = Email::find($request->id);
        return $email->toJson();;
    }

    /**
     * Get the email for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        if (Auth::check()) {
            return view('emails.form');
        } else {
            return Redirect::to( 'home');
        } 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $email = Email::find($id);
        $email->delete();

        return redirect('/')->with('success', 'Email deleted!');
    }
}
