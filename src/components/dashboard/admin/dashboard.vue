<template>
    
<div>
    <section class="content">
        <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-sm-6">
				<div class="col-md-12">
                <div class="card">
					
                    <div class="content-card">
                        <div class="row">

								<div class="col-xs-5">
									<div class="icon-big icon-bekup text-center">
										<!-- <i class="fa fa-address-card" aria-hidden="true"></i> -->
										<div>1</div>
									</div>
								</div>
								<div class="col-xs-7">
									<div class="numbers">
										<p>admin</p>
										Admin
									</div>
								</div>
                        </div>
                        <div class="footer">
                            <hr />
                            <div class="stats">
                                <i class="fa fa-search"></i>
                                <router-link to="/admin/manage" class="info-a link link--kumya">
                                    <span style="font-size:9px" data-letters="View Admin">
                                        View Admin
                                    </span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
				</div>

            </div>
            <div class="col-lg-3 col-sm-6">
				<div class="col-md-12">
                <div class="card">
                    <div class="content-card">
                        <div class="row">
                            <div class="col-xs-5">
                                <div class="icon-big icon-bekup text-center">
                                    <!-- <i class="fa fa-pencil-square-o" aria-hidden="true"></i> -->
									<div>2</div>
                                </div>
                            </div>
                            <div class="col-xs-7">
                                <div class="numbers">
                                    <p>tenant</p>
                                    Tenant
                                </div>
                            </div>
                        </div>
                        <div class="footer">
                            <hr />
                            <div class="stats">
                                <i class="fa fa-search"></i>
                                <router-link to="/tenant" class="info-a link link--kumya">
                                    <span style="font-size:9px" data-letters="View Tenant">
                                        View Tenant
                                    </span>
                                </router-link>                       
                            </div>
                        </div>
                    </div>
                </div>
				</div>

            </div>
            

        </div>
		
		
    </div> 
    </section>
</div>

</template>

<script>
export default {
    name:'dashboardadmin'
}
</script>