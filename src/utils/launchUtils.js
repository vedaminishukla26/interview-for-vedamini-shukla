export const buildLaunchQuery = ({ dateRange, statusFilter }) => {
  const query = {};
  if (dateRange?.from && dateRange?.to) {
    query.date_utc = {
      $gte: dateRange.from.toISOString(),
      $lte: dateRange.to.toISOString(),
    };
  }

  switch (statusFilter) {
    case 'success':
      query.success = true;
      break;
    case 'failed':
      query.success = false;
      break;
    case 'upcoming':
      query.upcoming = true;
      break;
    default:
      break;
  }

  return query;
};

export const mapLaunchDocToRow = (doc, index, pageNumber, pageLimit) => {
  const payload = doc.payloads?.[0] || {};
  const rocket = doc.rocket || {};
  const launchpad = doc.launchpad || {};

  return {
    no: (pageNumber - 1) * pageLimit + index + 1,
    lauchDate: doc.date_utc ? new Date(doc.date_utc).toLocaleString() : 'N/A',
    location: launchpad.name ?? launchpad.full_name ?? launchpad.locality ?? 'N/A',
    mission: doc.name,
    orbit: payload.orbit ?? rocket.payload_weights?.[0]?.id?.toUpperCase() ?? 'N/A',
    launchStatus: doc.success === null ? 'Upcoming' : doc.success ? 'Success' : 'Failed',
    rocket: rocket.name ?? 'N/A',
    raw: doc,
  };
};

export const buildOptions = ({ pageNumber = 1, pageLimit = 8 }) => ({
  page: pageNumber,
  limit: pageLimit,
  sort: { date_utc: 'desc' },
  populate: [
    { path: 'rocket', select: 'name type company country payload_weights' },
    { path: 'launchpad', select: 'name full_name locality region' },
    { path: 'payloads', select: 'type orbit' },
  ],
}); 