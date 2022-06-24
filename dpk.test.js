const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  const hash = (v) => {
    return crypto.createHash("sha3-512").update(v).digest("hex");
  };

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns PartitionKey if exist", () => {
    let event = { partitionKey : '123f' };
    const key = deterministicPartitionKey(event);
    expect(key).toBe("123f");
  });

  it("Returns hash value of PartitionKey if it is long", () => {
    let vv = "";
    for (let i = 0; i < 257; i++) vv = vv + "a";

    let event = { partitionKey : vv };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(hash(vv));
  });

  it("Returns json string of PartitionKey if PartitionKey is object", () => {
    let event = {
      partitionKey : {
        sector1 : 'ABCD',
        sector2 : 'BCDE'
      }
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(JSON.stringify(event.partitionKey));
  });

  it("Returns hash value of json string of PartitionKey if PartitionKey is object and it is too long", () => {
    let kv = "";
    for (let i = 0; i < 257; i++) kv = kv + "a";
    let event = {
      partitionKey : {
        sector1 : kv
      }
    };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(hash(JSON.stringify(event.partitionKey)));
  });

  it("Returns hash value of event object if PartitionKey not exist", () => {
    let event = "abcd";
    const key = deterministicPartitionKey("abcd");
    expect(key).toBe(hash(JSON.stringify(event)));
  });
});