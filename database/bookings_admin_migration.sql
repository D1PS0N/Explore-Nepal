-- Migration: Add status and created_at columns to bookings table
-- Safe/idempotent: uses IF NOT EXISTS pattern
-- Run this on the production database before deploying backend changes

ALTER TABLE `bookings`
ADD COLUMN `status` ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending';

ALTER TABLE `bookings`
ADD COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
