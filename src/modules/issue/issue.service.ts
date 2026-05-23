import { pool } from "../../db";
import type { IIssue } from "./issue.interface";

export const createIssueIntoDB = async (payload: IIssue) => {
  const { title, description, type, reporter_id } = payload;

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

  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

  let reportersMap: Record<number, unknown> = {};

  if (reporterIds.length > 0) {
    const reportersQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `;

    const reportersResult = await pool.query(reportersQuery, [reporterIds]);

    reportersMap = reportersResult.rows.reduce(
      (acc, reporter) => {
        acc[reporter.id] = reporter;
        return acc;
      },
      {} as Record<number, unknown>,
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

  const reporterResult = await pool.query(reporterQuery, [issue.reporter_id]);

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



