"""add BarecodeSKU model

Revision ID: 74db0d3ae7f9
Revises: 43615e9edfb2
Create Date: 2023-06-08 22:39:27.582589

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = '74db0d3ae7f9'
down_revision = '43615e9edfb2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('barcode_sku',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('barcode', sa.String(length=500), nullable=False),
    sa.Column('sku', sa.String(length=100), nullable=False),
    sa.Column('status', sa.Enum('ALLOWED', 'IN_CART', 'NOT_ALLOWED', name='barcodestatusenum'), nullable=False),
    sa.ForeignKeyConstraint(['sku'], ['products.sku'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('barcode')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('barcode_sku')
    # ### end Alembic commands ###
