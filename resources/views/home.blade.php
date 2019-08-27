@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    Welcome,

                    <div>
                        <a style="margin: 19px;" href="{{ route('email.create')}}" class="btn btn-primary">New contact</a>
                    </div>  

                    @include('emails.list')
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
