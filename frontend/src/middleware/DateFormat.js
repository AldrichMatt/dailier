export function formatDate (isoDate) {

    const date = new Date(isoDate)

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options)
}