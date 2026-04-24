# Routes

/applicants
/applicants/new

/applicants/:id
/applicants/:id/edit

/applicants/basic-info <!-- list view
/applicants/:id/basic-info <!-- detail view

/applicants/:id/education
/applicants/:id/experience

/applicants/:id/edit/basic-info
/applicants/:id/edit/education
/applicants/:id/edit/experience

## Code

```xml
<Route path="applicants">

  <Route index element={<ApplicantsPage />} />
  <Route path="new/*" element={<ApplicantCreateLayout />} />

  <Route path=":id">

    <Route index element={<ApplicantViewLayout />} />

    <Route path="basic-info" element={<BasicInfoView />} />
    <Route path="education" element={<EducationView />} />

    <Route path="edit/*" element={<ApplicantEditLayout />}>

        <Route path="basic-info" element={<BasicInfoForm />} />
        <Route path="education" element={<EducationForm />} />
        <Route path="experience" element={<ExperienceForm />} />

    </Route>

  </Route>

</Route>
```

## Directory Structure

```markdown
src/modules/applicants/

  api/
    applicants.api.js

  components/
    ApplicantTable.jsx
    ApplicantRow.jsx

  layouts/
    ApplicantViewLayout.jsx
    ApplicantEditLayout.jsx
    ApplicantCreateLayout.jsx

  pages/
    ApplicantsPage.jsx

  sections/

    basic-info/
      BasicInfoView.jsx
      BasicInfoForm.jsx
      basicInfo.schema.js

    education/
      EducationView.jsx
      EducationForm.jsx

    experience/
      ExperienceView.jsx
      ExperienceForm.jsx

    technologies/
      TechnologiesView.jsx
      TechnologiesForm.jsx
```
