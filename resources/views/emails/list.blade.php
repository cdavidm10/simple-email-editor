<div><p>
    @if($emails->isEmpty())
      You don't have emails created. You can created a new one clicking 'New Email' button
    @else
      You already created {{ $emails->count() }} emails, go ahead and continue creating. You can see your emails created on the following table
    @endif
</p></div>
<div>
    <a href="{{ route('email.create')}}" class="btn btn-outline-primary">New Email</a>
</div>

@if(!$emails->isEmpty())
  <table
    data-toggle="table"
    data-pagination="true"
    data-search="true">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Body</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      @foreach($emails as $email)
          <tr>
              <td>{{$email->subject}}</td>
              <td>{{$email->body}}</td>
              <td>
                <div class="btn-group">
                  <a href="{{ route('email.edit',$email->id)}}" class="btn btn-outline-success">Edit</a>
                  <form action="{{ route('email.destroy', $email->id)}}" method="post">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-outline-danger" type="submit">Delete</button>
                  </form>
                </div>
              </td>
          </tr>
      @endforeach
    </tbody>
  </table>
@endif