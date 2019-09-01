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
    data-url="{{ $emails }}"
    data-pagination="true"
    data-search="true">
    <thead>
      <tr>
        <th data-field="subject">Subject</th>
        <th data-field="body">Body</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      @foreach($emails as $email)
          <tr>
              <td data-field="subject">{{$email->subject}}</td>
              <td data-field="body">{{$email->body}}</td>
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