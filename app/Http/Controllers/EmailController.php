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
            return view('emails.create');
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
        $requiredData = $request->validate([
            'subject' => 'required',
            'body'    => 'required',
        ]);

        $email = Email::updateOrCreate(
            [
                'id' => $request->emailId
            ],[
                'subject' => $requiredData['subject'],
                'body'    => $request->body,
                'user_id' => Auth::user()->id
            ]
        );
        return response()->json([
           'message' => 'Email was successfully created',
           'status'  => 200
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('email.create', compact('id'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'subject'=>'required',
            'body'=>'required'
        ]);

        $email = Contact::find($id);
        $email->subject = $request->get('subject');
        $email->body = $request->get('body');
        $email->save();

        return redirect('/')->with('success', 'Email updated!');
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
