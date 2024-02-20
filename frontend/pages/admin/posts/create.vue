<template>
  <div class="d-flex justify-content-between mb-4">
    <h1 class="h3 ">Post Create</h1>
    <NuxtLink to="/admin/posts/" class="btn btn-primary">List
      <Icon name="majesticons:plus" />
    </NuxtLink>
  </div>

  <div class="row">
    <div class="col-12 col-md-12">
      <div class="card">
        <form id="post-create-form" class="p-4">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-2">
                <label id="name-label" for="name">Title</label>
                <input type="text" name="name" id="name" placeholder="Enter your name" class="form-control" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-2">
                <label id="email-label" for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-2">
                <label id="number-label" for="number">Age <small>(optional)</small></label>
                <input type="number" name="age" id="number" min="10" max="99" class="form-control" placeholder="Age">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-2">
                <label>current role</label>
                <select id="dropdown" name="role" class="form-control" required>
                  <option disabled selected value>Select</option>
                  <option value="student">Student</option>
                  <option value="job">Full Time Job</option>
                  <option value="learner">Full Time Learner</option>
                  <option value="preferNo">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-2">
                <label>Would you recommend survey to a friend?</label>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline1" value="Definitely" name="customRadioInline1"
                    class="custom-control-input" checked="">
                  <label class="custom-control-label" for="customRadioInline1">Definitely</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline2" value="Maybe" name="customRadioInline1"
                    class="custom-control-input">
                  <label class="custom-control-label" for="customRadioInline2">Maybe</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline3" value="Not sure" name="customRadioInline1"
                    class="custom-control-input">
                  <label class="custom-control-label" for="customRadioInline3">Not sure</label>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-2">
                <label>This survey useful yes or no?</label>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" name="yes" value="yes" id="yes" checked="">
                  <label class="custom-control-label" for="yes">Yes</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" name="no" value="no" id="no">
                  <label class="custom-control-label" for="no">No</label>
                </div>
              </div>
            </div>
          </div>


          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-2">
                <label>Description</label>
                <textarea id="comments" class="form-control" name="comment"
                  placeholder="Enter your comment here..."></textarea>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <button type="submit" id="submit" class="btn btn-primary btn-block">Submit</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})


</script>