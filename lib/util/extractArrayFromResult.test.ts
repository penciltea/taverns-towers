import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";

describe("extractArrayFromResult", () => {
  const fallback = ["default1", "default2"];

  it("returns extracted array for a fulfilled single object", () => {
    const result = Promise.resolve({ value: ["a", "b"] } as any);
    const settledResult: PromiseSettledResult<any> = { status: "fulfilled", value: { foo: ["a", "b"] } };
    
    const output = extractArrayFromResult(
      settledResult,
      (v) => v.foo,
      fallback
    );
    expect(output).toEqual(["a", "b"]);
  });

  it("returns extracted array for a fulfilled array of objects", () => {
    const settledResult: PromiseSettledResult<any[]> = {
      status: "fulfilled",
      value: [
        { foo: ["a"] },
        { foo: ["b", "c"] },
        { foo: [] }, // should ignore empty arrays
      ],
    };

    const output = extractArrayFromResult(
      settledResult,
      (v) => v.foo,
      fallback
    );
    expect(output).toEqual(["a", "b", "c"]);
  });

  it("returns fallback if fulfilled single object has undefined extraction", () => {
    const settledResult: PromiseSettledResult<any> = {
      status: "fulfilled",
      value: { bar: ["x"] }, // extractor returns undefined
    };

    const output = extractArrayFromResult(
      settledResult,
      (v) => v.foo, // foo does not exist
      fallback
    );
    expect(output).toEqual(fallback);
  });

  it("returns fallback if fulfilled array of objects has no extracted values", () => {
    const settledResult: PromiseSettledResult<any[]> = {
      status: "fulfilled",
      value: [
        { bar: ["x"] },
        { bar: ["y"] },
      ],
    };

    const output = extractArrayFromResult(
      settledResult,
      (v) => v.foo, // extractor returns undefined
      fallback
    );
    expect(output).toEqual(fallback);
  });

  it("returns fallback for rejected promise result", () => {
    interface TestObj {
        foo?: string[];
    }

    const fallback = ["default1", "default2"];

    const settledResult: PromiseSettledResult<TestObj> = {
        status: "fulfilled",
        value: { foo: ["a", "b"] },
    };

    const output = extractArrayFromResult<TestObj>(
        settledResult,
        (v) => v.foo,
        fallback
    );

    expect(output).toEqual(["a", "b"]);
  });

  it("returns fallback for null value", () => {
    const settledResult: PromiseSettledResult<any> = {
      status: "fulfilled",
      value: null,
    };

    const output = extractArrayFromResult(
      settledResult,
      (v) => v.foo,
      fallback
    );
    expect(output).toEqual(fallback);
  });

  it("flattens multiple objects and ignores undefined extractions", () => {
    const settledResult: PromiseSettledResult<any[]> = {
      status: "fulfilled",
      value: [
        { foo: ["x"] },
        { bar: ["y"] },
        { foo: ["z"] },
      ],
    };

    const output = extractArrayFromResult(
      settledResult,
      (v) => v.foo,
      fallback
    );
    expect(output).toEqual(["x", "z"]);
  });

  it("returns fallback if extracted arrays are empty", () => {
    const settledResult: PromiseSettledResult<any[]> = {
      status: "fulfilled",
      value: [{ foo: [] }, { foo: [] }],
    };

    const output = extractArrayFromResult(
      settledResult,
      (v) => v.foo,
      fallback
    );
    expect(output).toEqual(fallback);
  });
});
