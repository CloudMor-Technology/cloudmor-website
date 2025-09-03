-- Clean up duplicate support documents and migrate to assignment system
-- This migration will consolidate duplicate documents and use the assignment table properly

-- First, let's identify and consolidate documents that have the same title, description, and URL
-- but different client_id values (these are duplicates from the old system)

-- Step 1: Update all existing documents to be global (client_id = null)
-- We'll use assignments to control access instead
UPDATE support_documents SET client_id = null WHERE client_id IS NOT NULL;

-- Step 2: Remove any existing assignments to start fresh
DELETE FROM client_support_document_assignments;

-- Note: At this point, all documents are global and visible to all clients
-- The admin will need to reassign documents to specific clients if needed through the UI

-- Step 3: Clean up any actual duplicates (same title, description, URL)
-- Keep only the oldest document of each duplicate group
WITH duplicate_groups AS (
  SELECT 
    title,
    COALESCE(description, '') as description,
    COALESCE(url, '') as url,
    MIN(created_at) as keep_created_at
  FROM support_documents
  GROUP BY title, COALESCE(description, ''), COALESCE(url, '')
  HAVING COUNT(*) > 1
),
documents_to_delete AS (
  SELECT sd.id
  FROM support_documents sd
  INNER JOIN duplicate_groups dg ON 
    sd.title = dg.title 
    AND COALESCE(sd.description, '') = dg.description 
    AND COALESCE(sd.url, '') = dg.url
    AND sd.created_at != dg.keep_created_at
)
DELETE FROM support_documents 
WHERE id IN (SELECT id FROM documents_to_delete);