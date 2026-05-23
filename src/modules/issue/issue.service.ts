import { pool } from "../../db";
import type { IIssue } from "./issue.interface";
import type { JwtPayload } from "jsonwebtoken";

interface IReporter {
  id: number;
  name: string;
  role: string;
}

export const createIssueIntoDB = async (payload: IIssue) => {
  const { title, description, type, reporter_id } = payload;

  if (!title) {
    throw new Error("Title is required");
  }

  if (title.length > 150) {
    throw new Error("Title cannot exceed 150 characters");
  }

  if (!description) {
    throw new Error("Description is required");
  }

  if (description.length < 20) {
    throw new Error("Description must be at least 20 characters");
  }

  const validTypes = ["bug", "feature_request"];

  if (!validTypes.includes(type)) {
    throw new Error("Invalid issue type");
  }

  const query = `
    INSERT INTO issues (
      title,
      description,
      type,
      reporter_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [title, description, type, reporter_id];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllIssuesFromDB = async (
  sort: string,
  type?: string,
  status?: string,
) => {
  let query = `SELECT * FROM issues`;

  const conditions: string[] = [];
  const values: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  if (sort === "oldest") {
    query += ` ORDER BY created_at ASC`;
  } else {
    query += ` ORDER BY created_at DESC`;
  }

  const issuesResult = await pool.query(query, values);

  const issues = issuesResult.rows;

  const reporterIds = [
    ...new Set(issues.map((issue) => issue.reporter_id)),
  ];

  let reportersMap: Record<number, IReporter> = {};

  if (reporterIds.length > 0) {
    const reportersQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `;

    const reportersResult = await pool.query(reportersQuery, [reporterIds]);

    reportersMap = reportersResult.rows.reduce(
      (acc, reporter: IReporter) => {
        acc[reporter.id] = reporter;
        return acc;
      },
      {} as Record<number, IReporter>,
    );
  }

  const finalIssues = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reportersMap[issue.reporter_id],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return finalIssues;
};

export const getSingleIssueFromDB = async (id: string) => {
  const issueQuery = `
    SELECT *
    FROM issues
    WHERE id = $1
  `;

  const issueResult = await pool.query(issueQuery, [id]);

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  const reporterQuery = `
    SELECT id, name, role
    FROM users
    WHERE id = $1
  `;

  const reporterResult = await pool.query(reporterQuery, [
    issue.reporter_id,
  ]);

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporterResult.rows[0],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

export const updateIssueIntoDB = async (
  issueId: string,
  payload: Partial<IIssue>,
  user: JwtPayload,
) => {
  const issueRes = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [issueId],
  );

  const existingIssue = issueRes.rows[0];

  if (!existingIssue) {
    throw new Error("Issue not found");
  }

  if (user.role === "contributor") {
    if (existingIssue.reporter_id !== user.id) {
      throw new Error("Forbidden");
    }

    if (existingIssue.status !== "open") {
      throw new Error("You cannot edit this issue");
    }
  }

  if (payload.title && payload.title.length > 150) {
    throw new Error("Title cannot exceed 150 characters");
  }

  if (
    payload.description &&
    payload.description.length < 20
  ) {
    throw new Error(
      "Description must be at least 20 characters",
    );
  }

  if (payload.type) {
    const validTypes = ["bug", "feature_request"];

    if (!validTypes.includes(payload.type)) {
      throw new Error("Invalid issue type");
    }
  }

  const title = payload.title || existingIssue.title;

  const description =
    payload.description || existingIssue.description;

  const type = payload.type || existingIssue.type;

  const result = await pool.query(
    `
      UPDATE issues
      SET title = $1,
          description = $2,
          type = $3,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `,
    [title, description, type, issueId],
  );

  return result.rows[0];
};

export const deleteIssueFromDB = async (
  issueId: string,
) => {
  const issueRes = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [issueId],
  );

  const existingIssue = issueRes.rows[0];

  if (!existingIssue) {
    throw new Error("Issue not found");
  }

  await pool.query(
    `DELETE FROM issues WHERE id = $1`,
    [issueId],
  );

  return null;
};