// Adds the logged-in user's organization to a MongoDB query.
// Some collections use "org", while clients use the "orgs" array.

function withOrg(filter = {}, req, field = 'org') {
  return {
    ...filter,
    [field]: req.user.orgId
  };
}

module.exports = withOrg;