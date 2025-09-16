import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";

interface TestObj {
  foo?: string[];
  bar?: string[];
}

describe("extractArrayFromResult", () => {
  const fallback = ["default1", "default2"];

  it("returns extracted array for a fulfilled single object", () => {
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

  it("returns extracted array for a fulfilled array of objects", () => {
    const settledResult: PromiseSettledResult<TestObj[]> = {
      status: "fulfilled",
      value: [
        { foo: ["a"] },
        { foo: ["b", "c"] },
        { foo: [] }, // should ignore empty arrays
      ],
    };

    const output = extractArrayFromResult<TestObj>(
      settledResult,
      (v) => v.foo,
      fallback
    );

    expect(output).toEqual(["a", "b", "c"]);
  });

  it("returns fallback if fulfilled single object has undefined extraction", () => {
    const settledResult: PromiseSettledResult<TestObj> = {
      status: "fulfilled",
      value: { bar: ["x"] }, // extractor returns undefined
    };

    const output = extractArrayFromResult<TestObj>(
      settledResult,
      (v) => v.foo,
      fallback
    );

    expect(output).toEqual(fallback);
  });

  it("returns fallback if fulfilled array of objects has no extracted values", () => {
    const settledResult: PromiseSettledResult<TestObj[]> = {
      status: "fulfilled",
      value: [
        { bar: ["x"] },
        { bar: ["y"] },
      ],
    };

    const output = extractArrayFromResult<TestObj>(
      settledResult,
      (v) => v.foo,
      fallback
    );

    expect(output).toEqual(fallback);
  });

  it("returns extracted values even when extractor returns optional field", () => {
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
    const settledResult: PromiseSettledResult<TestObj | null> = {
      status: "fulfilled",
      value: null,
    };

    const output = extractArrayFromResult<TestObj>(
      settledResult,
      (v) => v.foo,
      fallback
    );

    expect(output).toEqual(fallback);
  });

  it("flattens multiple objects and ignores undefined extractions", () => {
    const settledResult: PromiseSettledResult<TestObj[]> = {
      status: "fulfilled",
      value: [
        { foo: ["x"] },
        { bar: ["y"] }, // extractor returns undefined
        { foo: ["z"] },
      ],
    };

    const output = extractArrayFromResult<TestObj>(
      settledResult,
      (v) => v.foo,
      fallback
    );

    expect(output).toEqual(["x", "z"]);
  });

  it("returns fallback if extracted arrays are empty", () => {
    const settledResult: PromiseSettledResult<TestObj[]> = {
      status: "fulfilled",
      value: [{ foo: [] }, { foo: [] }],
    };

    const output = extractArrayFromResult<TestObj>(
      settledResult,
      (v) => v.foo,
      fallback
    );

    expect(output).toEqual(fallback);
  });
});
