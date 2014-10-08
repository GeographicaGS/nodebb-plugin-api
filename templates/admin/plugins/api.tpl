<h1> API</h1>
<hr />

<form>
    <div class="alert alert-warning">

        <input type="text" data-field="api:baseURL" title="baseURL" class="form-control input-lg" placeholder="baseURL" />
        <br/>
   
        <input type="text" data-field="api:secret" title="API secret" class="form-control input-lg" placeholder="API secret" />
        <br/>

        <input type="text" data-field="api:authTimestampLiveTime" title="Max timestamp time live" class="form-control input-lg" placeholder="Max timestamp time live" />
        <br/>

        <label>Authenticate API, if you don't understand mark this</label>
        <input type="checkbox" data-field="api:authEnable" title="Auth enable" class="form-control input-lg" placeholder="" style="display: inline-block;width: 14px;vertical-align: middle;height: 19px;margin-left: 10px;margin-top: 0px;"/>

        

        <br/>

    </div>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
    require(['forum/admin/settings'], function(Settings) {
        Settings.prepare();
    });
</script>
