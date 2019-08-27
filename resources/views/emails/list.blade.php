{{ $emails }}

<table
  data-toggle="table"
  data-url="{{ $emails }}"
  data-pagination="true"
  data-search="true">
  <thead>
    <tr>
      <th data-sortable="true" data-field="id">Email ID</th>
      <th data-field="subject">Subject</th>
      <th data-field="body">Body</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    @foreach($emails as $email)
        <tr>
            <td data-sortable="true" data-field="id">Email ID</td>
            <td data-field="subject">Email Subject</td>
            <td data-field="body">Email Body</td>
            <th>
              
            </th>
        </tr>
    @endforeach
  </tbody>
</table>

<script>
$('#table').bootstrapTable({});
</script>