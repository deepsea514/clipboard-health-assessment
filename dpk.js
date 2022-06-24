const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  const hash = (v) => {
    return crypto.createHash("sha3-512").update(v).digest("hex");
  };

  if (event) {
    let candidate;
    if (event.partitionKey) { // check if partitionKey exists,
      candidate = event.partitionKey;
      if (typeof candidate !== "string") // check if it is string,
        candidate = JSON.stringify(candidate);

      if (candidate.length > MAX_PARTITION_KEY_LENGTH) // if it is too long, hash it.
        candidate = hash(candidate);
    } else {
      // we don't partitionKey so just take hash of json string of event
      candidate = JSON.stringify(event);
      candidate = hash(candidate);  
    }
    return candidate;
  } else {
    return TRIVIAL_PARTITION_KEY;
  }
};

exports.olddeterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};